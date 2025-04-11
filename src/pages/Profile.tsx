
import UserProfileForm from '@/components/profile/UserProfileForm';

const Profile = () => {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Your Profile</h1>
      <div className="max-w-4xl mx-auto">
        <UserProfileForm />
      </div>
    </div>
  );
};

export default Profile;
