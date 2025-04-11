
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { UserProfile, InsuranceRecommendation } from '../api/types';
import { getAIRecommendations } from '../services/aiRecommendationService';
import { toast } from 'sonner';

interface UserProfileContextType {
  userProfile: UserProfile | null;
  recommendations: InsuranceRecommendation[];
  isLoadingRecommendations: boolean;
  saveProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  generateRecommendations: () => Promise<void>;
}

const defaultUserProfile: UserProfile = {
  name: '',
  email: '',
  age: 30,
  occupation: '',
  income: 70000,
  assets: {
    home: false,
    car: true,
    otherVehicles: false,
  },
  familyStatus: 'Single',
  healthConditions: [],
  riskTolerance: 'medium',
  location: {
    city: '',
    state: '',
    zipCode: '',
  }
};

const UserProfileContext = createContext<UserProfileContextType>({
  userProfile: null,
  recommendations: [],
  isLoadingRecommendations: false,
  saveProfile: () => {},
  clearProfile: () => {},
  generateRecommendations: async () => {},
});

export const useUserProfile = () => useContext(UserProfileContext);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<InsuranceRecommendation[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  const saveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    toast.success('Profile saved successfully!');
  };

  const clearProfile = () => {
    setUserProfile(null);
    setRecommendations([]);
  };

  const generateRecommendations = async () => {
    if (!userProfile) {
      toast.error('Please complete your profile first');
      return;
    }
    
    try {
      setIsLoadingRecommendations(true);
      const aiRecommendations = await getAIRecommendations(userProfile);
      setRecommendations(aiRecommendations);
      toast.success('AI recommendations generated successfully!');
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
      toast.error('Failed to generate recommendations. Please try again.');
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  return (
    <UserProfileContext.Provider 
      value={{
        userProfile,
        recommendations,
        isLoadingRecommendations,
        saveProfile,
        clearProfile,
        generateRecommendations,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
