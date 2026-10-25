import mongoose, { Schema, Document } from 'mongoose';

export type CategoryType = 'planner' | 'performer' | 'crew';
export type DateType = 'single' | 'range';
export type RequirementStatus = 'open' | 'in_review' | 'matched' | 'closed';

export interface IPlannerDetails {
  servicesNeeded: string[];
  guestCount: number;
  budgetMin: number;
  budgetMax: number;
  currency: string;
  themeOrVibe?: string;
  cateringPreference?: string;
  specialInstructions?: string;
}

export interface IPerformerDetails {
  performanceType: string;
  genres: string[];
  durationHours: number;
  numberOfSets: number;
  soundProvidedByHost: boolean;
  stageSpecifications?: string;
  audienceSize?: number;
  specialRequests?: string;
}

export interface ICrewRole {
  role: string;
  count: number;
}

export interface ICrewDetails {
  rolesNeeded: ICrewRole[];
  shiftStartTime: string;
  shiftEndTime: string;
  gearPolicy: string;
  uniformRequired: boolean;
  mealsProvided: boolean;
  additionalNotes?: string;
}

export interface IContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface IRequirement extends Document {
  category: CategoryType;
  eventName: string;
  eventType: string;
  dateType: DateType;
  startDate: Date;
  endDate?: Date;
  location: {
    city: string;
    state: string;
    address?: string;
  };
  venue?: string;
  plannerDetails?: IPlannerDetails;
  performerDetails?: IPerformerDetails;
  crewDetails?: ICrewDetails;
  contact: IContactInfo;
  status: RequirementStatus;
  createdAt: Date;
  updatedAt: Date;
}

const RequirementSchema = new Schema<IRequirement>(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['planner', 'performer', 'crew'],
      index: true,
    },
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      maxlength: 120,
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      trim: true,
    },
    dateType: {
      type: String,
      enum: ['single', 'range'],
      default: 'single',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (this: IRequirement, val: Date) {
          if (this.dateType === 'range' && val) {
            return val >= this.startDate;
          }
          return true;
        },
        message: 'End date must be on or after start date',
      },
    },
    location: {
      city: { type: String, required: [true, 'City is required'], trim: true },
      state: { type: String, required: [true, 'State is required'], trim: true },
      address: { type: String, trim: true },
    },
    venue: {
      type: String,
      trim: true,
    },
    plannerDetails: {
      type: new Schema(
        {
          servicesNeeded: [{ type: String, trim: true }],
          guestCount: { type: Number, min: 1 },
          budgetMin: { type: Number, min: 0 },
          budgetMax: { type: Number, min: 0 },
          currency: { type: String, default: 'INR' },
          themeOrVibe: { type: String, trim: true },
          cateringPreference: { type: String, trim: true },
          specialInstructions: { type: String, trim: true },
        },
        { _id: false }
      ),
      default: undefined,
    },
    performerDetails: {
      type: new Schema(
        {
          performanceType: { type: String, trim: true },
          genres: [{ type: String, trim: true }],
          durationHours: { type: Number, min: 0.5 },
          numberOfSets: { type: Number, min: 1, default: 1 },
          soundProvidedByHost: { type: Boolean, default: false },
          stageSpecifications: { type: String, trim: true },
          audienceSize: { type: Number, min: 1 },
          specialRequests: { type: String, trim: true },
        },
        { _id: false }
      ),
      default: undefined,
    },
    crewDetails: {
      type: new Schema(
        {
          rolesNeeded: [
            {
              role: { type: String, required: true },
              count: { type: Number, required: true, min: 1 },
            },
          ],
          shiftStartTime: { type: String, trim: true },
          shiftEndTime: { type: String, trim: true },
          gearPolicy: { type: String, trim: true },
          uniformRequired: { type: Boolean, default: false },
          mealsProvided: { type: Boolean, default: true },
          additionalNotes: { type: String, trim: true },
        },
        { _id: false }
      ),
      default: undefined,
    },
    contact: {
      name: { type: String, required: [true, 'Contact name is required'], trim: true },
      email: { type: String, required: [true, 'Contact email is required'], trim: true, lowercase: true },
      phone: { type: String, required: [true, 'Contact phone is required'], trim: true },
    },
    status: {
      type: String,
      enum: ['open', 'in_review', 'matched', 'closed'],
      default: 'open',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound text index for search
RequirementSchema.index({ eventName: 'text', 'location.city': 'text', venue: 'text' });

export const Requirement = mongoose.model<IRequirement>('Requirement', RequirementSchema);
