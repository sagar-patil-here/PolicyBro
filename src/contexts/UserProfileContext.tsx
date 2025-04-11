
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { UserProfile, InsuranceRecommendation } from '../api/types';
import { getAIRecommendations } from '../services/aiRecommendationService';
import { fetchUserProfile, updateUserProfile, saveRecommendation } from '../api/backendService';
import { toast } from 'sonner';

interface UserProfileContextType {
  userProfile: UserProfile | null;
  recommendations: InsuranceRecommendation[];
  isLoadingProfile: boolean;
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
  isLoadingProfile: false,
  isLoadingRecommendations: false,
  saveProfile: () => {},
  clearProfile: () => {},
  generateRecommendations: async () => {},
});

export const useUserProfile = () => useContext(UserProfileContext);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<InsuranceRecommendation[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  // Fetch user profile from MongoDB on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const profile = await fetchUserProfile();
        setUserProfile(profile);
        console.log("Loaded user profile:", profile);
      } catch (error) {
        console.error("Failed to load user profile:", error);
        toast.error("Failed to load profile. Using default values.");
      } finally {
        setIsLoadingProfile(false);
      }
    };
    
    loadUserProfile();
  }, []);

  const saveProfile = async (profile: UserProfile) => {
    try {
      const savedProfile = await updateUserProfile(profile);
      setUserProfile(savedProfile);
      toast.success('Profile saved successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error('Failed to save profile. Please try again.');
      // Still update UI state to show user their changes
      setUserProfile(profile);
    }
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
      
      // Save recommendations to MongoDB
      const savedRecommendations = await Promise.all(
        aiRecommendations.map(recommendation => saveRecommendation(recommendation))
      );
      
      setRecommendations(savedRecommendations);
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
        isLoadingProfile,
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
