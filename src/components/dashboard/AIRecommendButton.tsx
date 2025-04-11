
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/contexts/UserProfileContext';

const AIRecommendButton = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile();
  const [showAnimation, setShowAnimation] = useState(false);

  // Show animation periodically to attract attention
  useEffect(() => {
    const interval = setInterval(() => {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 2000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (userProfile) {
      navigate('/recommendations');
    } else {
      navigate('/profile');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 overflow-hidden relative">
      {showAnimation && (
        <div className="absolute inset-0 bg-blue-100/30 animate-pulse rounded-lg" />
      )}
      <CardHeader>
        <div className="flex items-center">
          <Brain className={`h-5 w-5 mr-2 ${showAnimation ? 'text-primary animate-bounce' : 'text-blue-600'}`} />
          <CardTitle>AI Recommendations</CardTitle>
        </div>
        <CardDescription>Get personalized insurance plans</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          {userProfile 
            ? "Get AI-powered recommendations based on your profile data"
            : "Complete your profile to receive personalized recommendations"}
        </p>
        <Button 
          onClick={handleClick} 
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {userProfile ? "View Recommendations" : "Set Up Profile"}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIRecommendButton;
