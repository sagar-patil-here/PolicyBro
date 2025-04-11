
import UserProfileForm from '@/components/profile/UserProfileForm';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

const Profile = () => {
  const { isLoadingProfile, userProfile } = useUserProfile();

  // Debug log to track component rendering
  useEffect(() => {
    console.log('Profile page mounted', { isLoading: isLoadingProfile, hasProfile: !!userProfile });
  }, [isLoadingProfile, userProfile]);

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Your Profile</h1>
      <div className="max-w-4xl mx-auto">
        {isLoadingProfile ? (
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </CardContent>
          </Card>
        ) : (
          <UserProfileForm />
        )}
      </div>
    </div>
  );
};

export default Profile;
