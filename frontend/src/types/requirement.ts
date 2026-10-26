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

export interface IRequirementFormData {
  // Step 1: Event Basics
  eventName: string;
  eventType: string;
  dateType: DateType;
  startDate: string;
  endDate?: string;
  location: {
    city: string;
    state: string;
    address?: string;
  };
  venue?: string;
  category: CategoryType;

  // Step 2 & 3: Category Specific
  plannerDetails?: IPlannerDetails;
  performerDetails?: IPerformerDetails;
  crewDetails?: ICrewDetails;

  // Host Contact
  contact: IContactInfo;
}

export interface IRequirementItem extends IRequirementFormData {
  _id: string;
  status: RequirementStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IStatsSummary {
  total: number;
  planner: number;
  performer: number;
  crew: number;
}
