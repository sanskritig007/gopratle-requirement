import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}(T.*)?$/;

export const createRequirementSchema = z
  .object({
    category: z.enum(['planner', 'performer', 'crew'], {
      required_error: 'Category is required (planner, performer, or crew)',
    }),
    eventName: z
      .string()
      .min(3, 'Event name must be at least 3 characters')
      .max(120, 'Event name cannot exceed 120 characters'),
    eventType: z.string().min(2, 'Event type is required'),
    dateType: z.enum(['single', 'range']).default('single'),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid start date format',
    }),
    endDate: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: 'Invalid end date format',
      }),
    location: z.object({
      city: z.string().min(2, 'City is required'),
      state: z.string().min(2, 'State is required'),
      address: z.string().optional(),
    }),
    venue: z.string().optional(),

    // Planner specific fields
    plannerDetails: z
      .object({
        servicesNeeded: z.array(z.string()).min(1, 'Select at least one service needed'),
        guestCount: z.number().int().positive('Guest count must be a positive integer'),
        budgetMin: z.number().min(0, 'Minimum budget must be 0 or higher'),
        budgetMax: z.number().min(0, 'Maximum budget must be 0 or higher'),
        currency: z.string().default('INR'),
        themeOrVibe: z.string().optional(),
        cateringPreference: z.string().optional(),
        specialInstructions: z.string().optional(),
      })
      .optional(),

    // Performer specific fields
    performerDetails: z
      .object({
        performanceType: z.string().min(2, 'Performance type is required'),
        genres: z.array(z.string()).min(1, 'Select at least one genre or style'),
        durationHours: z.number().positive('Duration must be greater than 0'),
        numberOfSets: z.number().int().min(1, 'At least 1 set is required').default(1),
        soundProvidedByHost: z.boolean().default(false),
        stageSpecifications: z.string().optional(),
        audienceSize: z.number().int().positive().optional(),
        specialRequests: z.string().optional(),
      })
      .optional(),

    // Crew specific fields
    crewDetails: z
      .object({
        rolesNeeded: z
          .array(
            z.object({
              role: z.string().min(2, 'Role name required'),
              count: z.number().int().min(1, 'Count must be at least 1'),
            })
          )
          .min(1, 'At least one crew role is required'),
        shiftStartTime: z.string().min(1, 'Shift start time is required'),
        shiftEndTime: z.string().min(1, 'Shift end time is required'),
        gearPolicy: z.string().min(1, 'Gear policy is required'),
        uniformRequired: z.boolean().default(false),
        mealsProvided: z.boolean().default(true),
        additionalNotes: z.string().optional(),
      })
      .optional(),

    // Host contact info
    contact: z.object({
      name: z.string().min(2, 'Contact name is required'),
      email: z.string().email('Please enter a valid email address'),
      phone: z.string().min(7, 'Please enter a valid phone number'),
    }),
  })
  .superRefine((data, ctx) => {
    // Range date check
    if (data.dateType === 'range') {
      if (!data.endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date is required when date range is selected',
          path: ['endDate'],
        });
      } else if (new Date(data.endDate) < new Date(data.startDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End date cannot be earlier than start date',
          path: ['endDate'],
        });
      }
    }

    // Category requirement checks
    if (data.category === 'planner' && !data.plannerDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Planner details are required for Planner category',
        path: ['plannerDetails'],
      });
    }

    if (data.category === 'performer' && !data.performerDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Performer details are required for Performer category',
        path: ['performerDetails'],
      });
    }

    if (data.category === 'crew' && !data.crewDetails) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Crew details are required for Crew category',
        path: ['crewDetails'],
      });
    }
  });

export type CreateRequirementInput = z.infer<typeof createRequirementSchema>;
