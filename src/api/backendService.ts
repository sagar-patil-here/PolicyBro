
// Backend integration with MongoDB Atlas
import { UserProfile, InsuranceRecommendation } from "./types";
import { apiEndpoints } from './mongoConfig';

// These functions will be implemented when the backend is ready
export const fetchUserProfile = async (): Promise<UserProfile> => {
  // This will be replaced with actual API call
  // For now, return a mock response
  const mockProfile: UserProfile = {
    name: "John Doe",
    email: "john@example.com",
    age: 35,
    occupation: "Software Engineer",
    income: 85000,
    assets: {
      home: true,
      car: true,
      otherVehicles: false,
    },
    familyStatus: "Married",
    healthConditions: ["Allergies"],
    riskTolerance: "medium",
    location: {
      city: "San Francisco",
      state: "California",
      zipCode: "94105",
    }
  };
  
  return Promise.resolve(mockProfile);
};

export const updateUserProfile = async (profile: UserProfile): Promise<UserProfile> => {
  // This will be replaced with actual API call
  console.log("Updating profile:", profile);
  return Promise.resolve(profile);
};

export const fetchRecommendations = async (userId: string): Promise<InsuranceRecommendation[]> => {
  // This will be replaced with actual API call
  const mockRecommendations: InsuranceRecommendation[] = [
    {
      id: "1",
      type: "auto",
      title: "Premium Auto Protection",
      company: "SafeDrive Insurance",
      premium: 1200,
      coverage: 500000,
      matchScore: 92,
      keyFeatures: ["Accident forgiveness", "Roadside assistance", "Rental car coverage"],
      relevantFactors: ["Car ownership", "Clean driving record", "Urban location"]
    },
    {
      id: "2",
      type: "home",
      title: "Complete Home Shield",
      company: "HomeSecure Insurance",
      premium: 950,
      coverage: 350000,
      matchScore: 88,
      keyFeatures: ["Natural disaster coverage", "Personal property protection", "Liability coverage"],
      relevantFactors: ["Home ownership", "Medium risk tolerance", "Property value"]
    },
    {
      id: "3",
      type: "health",
      title: "Family Health Plan",
      company: "LifeWell Health",
      premium: 450,
      coverage: 1000000,
      matchScore: 95,
      keyFeatures: ["Low deductibles", "Preventive care", "Specialist coverage"],
      relevantFactors: ["Family status", "Health conditions", "Age"]
    }
  ];
  
  return Promise.resolve(mockRecommendations);
};

// We'll expand this file when the Express backend is implemented with MongoDB

