
import { UserProfile, InsuranceRecommendation } from "../api/types";

const GEMINI_API_KEY = "AIzaSyBTKr3iABfFByddkjuuyCupybIyvdxZS5Q";

export const getAIRecommendations = async (userProfile: UserProfile): Promise<InsuranceRecommendation[]> => {
  try {
    // In a real implementation, this would call the Gemini API
    // For now, we'll simulate the response with a timeout
    console.log("Requesting AI recommendations for profile:", userProfile);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock recommendations based on user profile
    return generateMockRecommendations(userProfile);
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    throw new Error("Failed to fetch AI recommendations");
  }
};

// Temporary mock function until we implement the actual Gemini API integration
const generateMockRecommendations = (profile: UserProfile): InsuranceRecommendation[] => {
  const recommendations: InsuranceRecommendation[] = [];
  
  // Auto insurance recommendation
  if (profile.assets.car) {
    recommendations.push({
      id: "ai-auto-1",
      type: "auto",
      title: "Premium Auto Protection",
      company: "SafeDrive Insurance Co.",
      premium: profile.income > 100000 ? 150 : 120,
      coverage: profile.income > 100000 ? 300000 : 200000,
      matchScore: 92,
      keyFeatures: [
        "Accident forgiveness",
        "Roadside assistance",
        "Rental car coverage"
      ],
      relevantFactors: [
        `${profile.age < 30 ? "Youth discount applied" : "Experience discount"}`,
        `${profile.location.state} coverage optimized`,
        "Based on your driving profile"
      ]
    });
  }
  
  // Home insurance recommendation
  if (profile.assets.home) {
    recommendations.push({
      id: "ai-home-1",
      type: "home",
      title: "Complete Home Shield",
      company: "HomeGuard Insurance",
      premium: profile.income > 100000 ? 95 : 75,
      coverage: profile.income > 100000 ? 500000 : 350000,
      matchScore: 89,
      keyFeatures: [
        "Natural disaster coverage",
        "Personal property protection",
        "Liability coverage"
      ],
      relevantFactors: [
        `Property in ${profile.location.city}`,
        "Based on your asset value",
        `${profile.riskTolerance} risk tolerance profile`
      ]
    });
  }
  
  // Health insurance recommendation
  recommendations.push({
    id: "ai-health-1",
    type: "health",
    title: "Comprehensive Health Plan",
    company: "Wellness Health Inc.",
    premium: profile.income > 100000 ? 220 : 180,
    coverage: 1000000,
    matchScore: profile.healthConditions.length > 0 ? 94 : 88,
    keyFeatures: [
      "Low deductible",
      "Prescription coverage",
      "Specialist visits"
    ],
    relevantFactors: [
      `Age group: ${profile.age < 30 ? "Young adult" : profile.age < 60 ? "Middle-aged" : "Senior"}`,
      profile.healthConditions.length > 0 ? "Pre-existing conditions covered" : "Preventive care focus",
      "Optimized for your family status"
    ]
  });
  
  // Life insurance recommendation
  if (profile.familyStatus.toLowerCase().includes("married") || 
      profile.familyStatus.toLowerCase().includes("children")) {
    recommendations.push({
      id: "ai-life-1",
      type: "life",
      title: "Family Protection Plan",
      company: "FamilyCare Life",
      premium: profile.income * 0.001,
      coverage: profile.income * 10,
      matchScore: 90,
      keyFeatures: [
        "Income replacement",
        "Child education coverage",
        "Investment component"
      ],
      relevantFactors: [
        `Family status: ${profile.familyStatus}`,
        `Based on annual income: $${profile.income}`,
        "Optimized for long-term security"
      ]
    });
  }
  
  return recommendations;
};
