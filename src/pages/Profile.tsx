
import UserProfileForm from '@/components/profile/UserProfileForm';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { isLoadingProfile } = useUserProfile();

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
