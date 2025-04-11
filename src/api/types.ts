
// API Types for MongoDB backend integration
export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  age: number;
  occupation: string;
  income: number;
  assets: {
    home: boolean;
    car: boolean;
    otherVehicles: boolean;
  };
  familyStatus: string;
  healthConditions: string[];
  riskTolerance: 'low' | 'medium' | 'high';
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface InsuranceRecommendation {
  id: string;
  type: 'auto' | 'home' | 'health' | 'life' | 'travel';
  title: string;
  company: string;
  premium: number;
  coverage: number;
  matchScore: number;
  keyFeatures: string[];
  relevantFactors: string[];
}
