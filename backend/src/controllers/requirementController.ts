import { Request, Response } from 'express';
import { Requirement } from '../models/Requirement.js';
import { createRequirementSchema } from '../validations/requirementValidation.js';
import { ZodError } from 'zod';

export const createRequirement = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = createRequirementSchema.parse(req.body);

    // Clean up category-specific data so only the chosen category is stored
    const sanitizedData: any = {
      category: validatedData.category,
      eventName: validatedData.eventName,
      eventType: validatedData.eventType,
      dateType: validatedData.dateType,
      startDate: new Date(validatedData.startDate),
      endDate: validatedData.endDate ? new Date(validatedData.endDate) : undefined,
      location: validatedData.location,
      venue: validatedData.venue,
      contact: validatedData.contact,
    };

    if (validatedData.category === 'planner') {
      sanitizedData.plannerDetails = validatedData.plannerDetails;
    } else if (validatedData.category === 'performer') {
      sanitizedData.performerDetails = validatedData.performerDetails;
    } else if (validatedData.category === 'crew') {
      sanitizedData.crewDetails = validatedData.crewDetails;
    }

    const requirement = await Requirement.create(sanitizedData);

    res.status(201).json({
      success: true,
      message: `Requirement for ${validatedData.category.toUpperCase()} created successfully!`,
      data: requirement,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
      return;
    }

    console.error('Error creating requirement:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while saving requirement',
      error: error.message,
    });
  }
};

export const getRequirements = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, eventType, city, search, sort = 'newest' } = req.query;

    const query: any = {};

    if (category && typeof category === 'string' && ['planner', 'performer', 'crew'].includes(category)) {
      query.category = category;
    }

    if (eventType && typeof eventType === 'string' && eventType !== 'all') {
      query.eventType = new RegExp(`^${eventType}$`, 'i');
    }

    if (city && typeof city === 'string') {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (search && typeof search === 'string') {
      query.$or = [
        { eventName: new RegExp(search, 'i') },
        { 'location.city': new RegExp(search, 'i') },
        { venue: new RegExp(search, 'i') },
        { eventType: new RegExp(search, 'i') },
      ];
    }

    const sortOptions: any = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

    const requirements = await Requirement.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: requirements.length,
      data: requirements,
    });
  } catch (error: any) {
    console.error('Error fetching requirements:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve requirements',
      error: error.message,
    });
  }
};

export const getRequirementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const requirement = await Requirement.findById(id);

    if (!requirement) {
      res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: requirement,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Invalid requirement ID format',
      error: error.message,
    });
  }
};

export const getRequirementStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const stats = await Requirement.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedStats = {
      total: 0,
      planner: 0,
      performer: 0,
      crew: 0,
    };

    stats.forEach((item) => {
      if (item._id in formattedStats) {
        (formattedStats as any)[item._id] = item.count;
        formattedStats.total += item.count;
      }
    });

    res.status(200).json({
      success: true,
      data: formattedStats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch requirement statistics',
      error: error.message,
    });
  }
};

export const deleteRequirement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Requirement.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Requirement not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Requirement deleted successfully',
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete requirement',
      error: error.message,
    });
  }
};
