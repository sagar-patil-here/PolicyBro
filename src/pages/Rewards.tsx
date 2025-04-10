
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import EcoActivityCard from "@/components/rewards/EcoActivityCard";
import { Award, Leaf, ChevronRight, Calendar, BadgeCheck, BarChart3, Trophy } from "lucide-react";

const Rewards = () => {
  const [currentLevel, setCurrentLevel] = useState(4);
  const [currentPoints, setCurrentPoints] = useState(420);
  const pointsRequired = 500;
  const progress = (currentPoints / pointsRequired) * 100;

  const ecoActivities = [
    {
      title: "Public Transit Week",
      description: "Use public transportation for a full week",
      pointsEarned: 45,
      maxPoints: 60,
      co2Saved: 15,
      isCompleted: false,
      category: "transport" as const,
    },
    {
      title: "Bike Commuter",
      description: "Commute by bicycle for 3 days",
      pointsEarned: 30,
      maxPoints: 30,
      co2Saved: 8.5,
      isCompleted: true,
      category: "transport" as const,
    },
    {
      title: "Energy Saver",
      description: "Reduce energy consumption by 15%",
      pointsEarned: 25,
      maxPoints: 50,
      co2Saved: 12,
      isCompleted: false,
      category: "energy" as const,
    },
    {
      title: "Water Conservation",
      description: "Reduce water usage by 20%",
      pointsEarned: 40,
      maxPoints: 40,
      co2Saved: 5,
      isCompleted: true,
      category: "lifestyle" as const,
    },
    {
      title: "Eco-Friendly Shopping",
      description: "Purchase from sustainable brands",
      pointsEarned: 15,
      maxPoints: 30,
      co2Saved: 3.2,
      isCompleted: false,
      category: "lifestyle" as const,
    },
    {
      title: "Zero Waste Challenge",
      description: "No single-use plastics for a week",
      pointsEarned: 20,
      maxPoints: 40,
      co2Saved: 7.8,
      isCompleted: false,
      category: "lifestyle" as const,
    },
  ];

  const rewardLevels = [
    { level: 1, name: "Eco Novice", points: 100, discount: "1%", badge: "🌱" },
    { level: 2, name: "Green Starter", points: 200, discount: "3%", badge: "🌿" },
    { level: 3, name: "Sustainability Fan", points: 300, discount: "5%", badge: "🌲" },
    { level: 4, name: "Eco Enthusiast", points: 400, discount: "7%", badge: "🌳" },
    { level: 5, name: "Green Champion", points: 600, discount: "10%", badge: "🌍" },
    { level: 6, name: "Planet Protector", points: 800, discount: "12%", badge: "⭐" },
  ];

  const currentLevelInfo = rewardLevels.find(level => level.level === currentLevel) || rewardLevels[0];
  const nextLevelInfo = rewardLevels.find(level => level.level === currentLevel + 1);

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sustainable Rewards</h1>
          <p className="text-muted-foreground">Earn rewards by making eco-friendly choices.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Activity History
          </Button>
          <Button>
            <Leaf className="mr-2 h-4 w-4" />
            Log New Activity
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mr-3">
                  {currentLevelInfo.badge}
                </div>
                <div>
                  <CardTitle>Level {currentLevel}: {currentLevelInfo.name}</CardTitle>
                  <CardDescription>Current Discount: {currentLevelInfo.discount} off eligible premiums</CardDescription>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                {currentPoints} Points
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextLevelInfo ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level {nextLevelInfo.level}: {nextLevelInfo.name}</span>
                    <span className="font-medium">{currentPoints} / {nextLevelInfo.points} points</span>
                  </div>
                  <div className="h-3 rounded-full bg-green-100 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-green-600"
                      style={{ width: `${(currentPoints / nextLevelInfo.points) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Earn <span className="font-medium">{nextLevelInfo.points - currentPoints}</span> more points to reach Level {nextLevelInfo.level} and unlock a <span className="text-green-700 font-medium">{nextLevelInfo.discount}</span> discount!
                  </p>
                </>
              ) : (
                <p className="text-sm font-medium text-green-700">
                  Congratulations! You've reached the highest reward level.
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t border-green-100 flex justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Total CO₂ Saved</span>
              <div className="text-2xl font-bold text-green-700">74.6 kg</div>
            </div>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800">
              View Your Impact
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-amber-500" />
              <span>Leaderboard</span>
            </CardTitle>
            <CardDescription>How you compare to others</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-2">
              {[
                { rank: 1, name: "Sarah M.", points: 845, isYou: false },
                { rank: 2, name: "Michael T.", points: 792, isYou: false },
                { rank: 3, name: "Alex W.", points: 631, isYou: false },
                { rank: 4, name: "You", points: 420, isYou: true },
                { rank: 5, name: "Jamie L.", points: 386, isYou: false },
              ].map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between px-4 py-2 rounded-md ${
                    user.isYou ? "bg-green-50 border border-green-200" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 
                      ${
                        user.rank === 1
                          ? "bg-amber-500 text-white"
                          : user.rank === 2
                          ? "bg-gray-400 text-white"
                          : user.rank === 3
                          ? "bg-amber-700 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <span className={user.isYou ? "font-medium" : ""}>{user.name}</span>
                  </div>
                  <div className="font-medium">
                    {user.points} <span className="text-xs text-muted-foreground">pts</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Button variant="ghost" className="w-full text-sm text-muted-foreground">
              View Full Leaderboard
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Eco Activities</h2>
          <Button variant="ghost" size="sm" className="text-sm">
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ecoActivities.map((activity, index) => (
                <EcoActivityCard key={index} {...activity} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="transport" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ecoActivities
                .filter((activity) => activity.category === "transport")
                .map((activity, index) => (
                  <EcoActivityCard key={index} {...activity} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="energy" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ecoActivities
                .filter((activity) => activity.category === "energy")
                .map((activity, index) => (
                  <EcoActivityCard key={index} {...activity} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="lifestyle" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ecoActivities
                .filter((activity) => activity.category === "lifestyle")
                .map((activity, index) => (
                  <EcoActivityCard key={index} {...activity} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold">Reward Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {rewardLevels.map((level) => (
            <Card 
              key={level.level}
              className={`${currentLevel === level.level ? 'border-green-500 bg-green-50' : currentLevel > level.level ? 'bg-gray-50' : ''}`}
            >
              <CardHeader className="pb-2 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-xl mb-2">
                  {level.badge}
                </div>
                <CardTitle className="text-base">Level {level.level}</CardTitle>
                <CardDescription>{level.name}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-2">
                <div className="text-sm text-muted-foreground">Required Points</div>
                <div className="text-xl font-bold">{level.points}</div>
              </CardContent>
              <CardFooter className="pt-2 border-t flex justify-center">
                <Badge variant={currentLevel >= level.level ? "default" : "outline"} className={currentLevel >= level.level ? "bg-green-600" : ""}>
                  {currentLevel >= level.level && <BadgeCheck className="h-3.5 w-3.5 mr-1" />}
                  {level.discount} Discount
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
