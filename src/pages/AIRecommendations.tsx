
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { AIRecommendationCard } from '@/components/recommendations/AIRecommendationCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, RefreshCw, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIRecommendations = () => {
  const { userProfile, recommendations, isLoadingRecommendations, generateRecommendations } = useUserProfile();
  const [activeTab, setActiveTab] = useState<string>('all');
  const navigate = useNavigate();

  const handleGenerateRecommendations = async () => {
    await generateRecommendations();
  };

  const filteredRecommendations = activeTab === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === activeTab);

  if (!userProfile) {
    return (
      <div className="container py-8">
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle>Profile Required</CardTitle>
            <CardDescription>You need to complete your profile before getting AI recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/profile')} className="mt-4">
              <User className="mr-2 h-4 w-4" />
              Create Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Recommendations</h1>
          <p className="text-muted-foreground">
            Personalized insurance recommendations based on your profile
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/profile')}>
            <User className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button 
            onClick={handleGenerateRecommendations}
            disabled={isLoadingRecommendations}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoadingRecommendations ? 'animate-spin' : ''}`} />
            Refresh Recommendations
          </Button>
        </div>
      </div>
      
      {recommendations.length > 0 ? (
        <>
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="mb-6"
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              {recommendations.some(r => r.type === "auto") && (
                <TabsTrigger value="auto">Auto</TabsTrigger>
              )}
              {recommendations.some(r => r.type === "home") && (
                <TabsTrigger value="home">Home</TabsTrigger>
              )}
              {recommendations.some(r => r.type === "health") && (
                <TabsTrigger value="health">Health</TabsTrigger>
              )}
              {recommendations.some(r => r.type === "life") && (
                <TabsTrigger value="life">Life</TabsTrigger>
              )}
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.map((recommendation) => (
              <AIRecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        </>
      ) : isLoadingRecommendations ? (
        <Card className="p-8 text-center">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <RefreshCw className="h-12 w-12 animate-spin text-primary mb-4" />
              <h3 className="text-xl font-medium">Generating Recommendations...</h3>
              <p className="text-muted-foreground mt-2">
                Our AI is analyzing your profile to find the best insurance options for you.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-8 text-center">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-medium">Get Personalized Recommendations</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Click the button below to generate AI-powered insurance recommendations based on your profile.
              </p>
              <Button onClick={handleGenerateRecommendations} size="lg">
                Generate Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIRecommendations;
