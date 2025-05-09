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
  name: 'Guest User',
  email: 'guest@example.com',
  age: 30,
  occupation: 'Professional',
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
    city: 'New York',
    state: 'New York',
    zipCode: '10001',
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
        console.log("Attempting to load user profile...");
        const profile = await fetchUserProfile();
        setUserProfile(profile);
        console.log("Loaded user profile:", profile);
      } catch (error) {
        console.error("Failed to load user profile:", error);
        // Set default profile instead of keeping loading state
        setUserProfile(defaultUserProfile);
        toast.error("Failed to load profile from database. Using default values.");
      } finally {
        // Always set loading to false, even if there's an error
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
      toast.error('Failed to save profile to database. Data saved locally only.');
      // Still update UI state to show user their changes
      setUserProfile(profile);
    }
  };

  const clearProfile = () => {
    setUserProfile(defaultUserProfile);
    setRecommendations([]);
    toast.info('Profile reset to defaults');
  };

  const generateRecommendations = async () => {
    if (!userProfile) {
      toast.error('Please complete your profile first');
      return;
    }
    
    try {
      setIsLoadingRecommendations(true);
      const aiRecommendations = await getAIRecommendations(userProfile);
      
      // Try to save recommendations to MongoDB
      try {
        const savedRecommendations = await Promise.all(
          aiRecommendations.map(recommendation => saveRecommendation(recommendation))
        );
        setRecommendations(savedRecommendations);
      } catch (error) {
        // If MongoDB fails, still show recommendations
        console.error('Failed to save recommendations to database:', error);
        setRecommendations(aiRecommendations);
        toast.warning('Generated recommendations but failed to save to database');
      }
      
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
