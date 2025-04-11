
// Backend integration with MongoDB Atlas
import { UserProfile, InsuranceRecommendation } from "./types";
import { apiEndpoints, getCollection } from './mongoConfig';
import { ObjectId } from 'mongodb';

export const fetchUserProfile = async (userId: string = "current-user"): Promise<UserProfile> => {
  try {
    // Try to fetch from MongoDB
    const collection = await getCollection('userProfiles');
    const userProfile = await collection.findOne({ userId });
    
    if (userProfile) {
      // Convert MongoDB _id to id string
      const formattedProfile: UserProfile = {
        id: userProfile._id.toString(),
        name: userProfile.name,
        email: userProfile.email,
        age: userProfile.age,
        occupation: userProfile.occupation,
        income: userProfile.income,
        assets: userProfile.assets,
        familyStatus: userProfile.familyStatus,
        healthConditions: userProfile.healthConditions,
        riskTolerance: userProfile.riskTolerance,
        location: userProfile.location
      };
      
      return formattedProfile;
    }
  } catch (error) {
    console.error("Error fetching user profile from MongoDB:", error);
  }
  
  // Fallback to mock data if MongoDB fails or user not found
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
  
  return mockProfile;
};

export const updateUserProfile = async (profile: UserProfile, userId: string = "current-user"): Promise<UserProfile> => {
  try {
    const collection = await getCollection('userProfiles');
    
    // Prepare MongoDB document
    const profileDocument = {
      ...profile,
      userId,
      updatedAt: new Date()
    };
    
    // Remove id field if it exists (MongoDB will use _id)
    if (profileDocument.id) {
      delete profileDocument.id;
    }
    
    // Check if profile already exists
    const existingProfile = await collection.findOne({ userId });
    
    if (existingProfile) {
      // Update existing profile
      await collection.updateOne(
        { userId }, 
        { $set: profileDocument }
      );
      
      // Return updated profile with id
      return {
        ...profile,
        id: existingProfile._id.toString()
      };
    } else {
      // Insert new profile
      const result = await collection.insertOne(profileDocument);
      
      // Return inserted profile with id
      return {
        ...profile,
        id: result.insertedId.toString()
      };
    }
  } catch (error) {
    console.error("Error updating user profile in MongoDB:", error);
    // Return the original profile if MongoDB fails
    console.log("Returning original profile without saving to DB");
    return profile;
  }
};

export const fetchRecommendations = async (userId: string = "current-user"): Promise<InsuranceRecommendation[]> => {
  try {
    // Try to fetch from MongoDB
    const collection = await getCollection('recommendations');
    const recommendations = await collection.find({ userId }).toArray();
    
    if (recommendations && recommendations.length > 0) {
      return recommendations.map(rec => ({
        ...rec,
        id: rec._id.toString()
      }));
    }
  } catch (error) {
    console.error("Error fetching recommendations from MongoDB:", error);
  }
  
  // Fallback to mock data if MongoDB fails or no recommendations found
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
  
  return mockRecommendations;
};

export const saveRecommendation = async (recommendation: InsuranceRecommendation, userId: string = "current-user"): Promise<InsuranceRecommendation> => {
  try {
    const collection = await getCollection('recommendations');
    
    // Prepare MongoDB document
    const recommendationDocument = {
      ...recommendation,
      userId,
      createdAt: new Date()
    };
    
    // Remove id field if it exists (MongoDB will use _id)
    if (recommendationDocument.id) {
      delete recommendationDocument.id;
    }
    
    // Insert recommendation
    const result = await collection.insertOne(recommendationDocument);
    
    // Return inserted recommendation with id
    return {
      ...recommendation,
      id: result.insertedId.toString()
    };
  } catch (error) {
    console.error("Error saving recommendation to MongoDB:", error);
    // Return the original recommendation if MongoDB fails
    return recommendation;
  }
};
