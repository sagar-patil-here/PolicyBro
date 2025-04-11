import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import PolicyCard from "@/components/dashboard/PolicyCard";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import AIRecommendButton from "@/components/dashboard/AIRecommendButton";
import StatCard from "@/components/dashboard/StatCard";
import ClaimCard from "@/components/dashboard/ClaimCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Wallet, ReceiptText, PieChart, Bell, ChevronRight, BarChart3, Award, Leaf } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const policies = [
    {
      type: "auto" as const,
      title: "Auto Insurance",
      company: "SafeDrive Insurance Co.",
      policyNumber: "AUTO-28574",
      premium: 125,
      nextPayment: "May 15, 2025",
      daysUntilRenewal: 35,
      status: "active" as const,
    },
    {
      type: "home" as const,
      title: "Home Insurance",
      company: "HomeShield Providers",
      policyNumber: "HOME-47215",
      premium: 95,
      nextPayment: "June 1, 2025",
      daysUntilRenewal: 52,
      status: "active" as const,
    },
    {
      type: "health" as const,
      title: "Health Insurance",
      company: "Wellness Health Inc.",
      policyNumber: "HLTH-91056",
      premium: 210,
      nextPayment: "May 1, 2025",
      daysUntilRenewal: 21,
      status: "review" as const,
    },
  ];

  const recommendations = [
    {
      type: "travel" as const,
      title: "Travel Insurance",
      company: "Global Travel Protect",
      premium: 45,
      savings: 15,
      reasons: ["Your upcoming trips", "Better coverage than alternatives", "Includes COVID protection"],
      matchPercentage: 92,
    },
    {
      type: "life" as const,
      title: "Life Insurance",
      company: "FamilyCare Life",
      premium: 85,
      savings: 0,
      reasons: ["Family protection", "Tax benefits", "Investment component"],
      matchPercentage: 87,
    },
  ];

  const claims = [
    {
      title: "Windshield Replacement",
      claimNumber: "CLM-38291",
      dateSubmitted: "April 2, 2025",
      amount: 750,
      status: "approved" as const,
      progressPercentage: 100,
      type: "auto" as const,
    },
    {
      title: "Water Damage Repair",
      claimNumber: "CLM-47392",
      dateSubmitted: "March 15, 2025",
      amount: 3200,
      status: "pending" as const,
      progressPercentage: 60,
      type: "home" as const,
    },
  ];

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your insurance overview.</p>
        </div>
        <Button variant="outline" onClick={() => toast.message("Notifications are up to date")}>
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Coverage"
            value="$750,000"
            description="Across all policies"
            icon={<Shield className="h-4 w-4 text-blue-500" />}
          />
          <StatCard
            title="Monthly Premium"
            value="$430"
            trend={{ value: 5, isPositive: false }}
            description="Next payment May 1"
            icon={<Wallet className="h-4 w-4 text-green-500" />}
          />
          <StatCard
            title="Active Claims"
            value="2"
            description="1 recently approved"
            icon={<ReceiptText className="h-4 w-4 text-yellow-500" />}
          />
          <StatCard
            title="Eco Score"
            value="420"
            trend={{ value: 12, isPositive: true }}
            description="+15 points this week"
            icon={<Leaf className="h-4 w-4 text-green-600" />}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Policies</h2>
            <Button variant="ghost" size="sm" className="text-sm">
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {policies.map((policy, index) => (
                <PolicyCard key={index} {...policy} />
              ))}
            </div>
          )}

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Claims</h2>
              <Button variant="ghost" size="sm" className="text-sm">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-48 bg-muted rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {claims.map((claim, index) => (
                  <ClaimCard key={index} {...claim} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <AIRecommendButton />

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Personalized based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-48 bg-muted rounded-lg"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendations.map((recommendation, index) => (
                    <RecommendationCard key={index} {...recommendation} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Analysis</CardTitle>
              <CardDescription>Based on your current coverage</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-48 bg-muted rounded-lg animate-pulse"></div>
              ) : (
                <Tabs defaultValue="coverage">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="coverage">Coverage</TabsTrigger>
                    <TabsTrigger value="exposure">Exposure</TabsTrigger>
                  </TabsList>
                  <TabsContent value="coverage" className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <PieChart className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Coverage Strength</span>
                      </div>
                      <span className="text-sm font-bold">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <ul className="space-y-2 text-sm mt-4">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Auto</span>
                        <span className="font-medium">Excellent</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Home</span>
                        <span className="font-medium">Good</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Health</span>
                        <span className="font-medium">Moderate</span>
                      </li>
                      <li className="flex justify-between text-yellow-600">
                        <span>Life</span>
                        <span className="font-medium">Not Covered</span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="exposure" className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2 text-orange-500" />
                        <span className="text-sm font-medium">Risk Exposure</span>
                      </div>
                      <span className="text-sm font-bold">Medium</span>
                    </div>
                    <Progress value={35} className="h-2 bg-muted bg-orange-500" />
                    <ul className="space-y-2 text-sm mt-4">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Flood Risk</span>
                        <span className="font-medium">Low</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Accident Risk</span>
                        <span className="font-medium">Medium</span>
                      </li>
                      <li className="flex justify-between text-yellow-600">
                        <span>Health Expenses</span>
                        <span className="font-medium">High</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Property Damage</span>
                        <span className="font-medium">Low</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  <span>Eco Rewards</span>
                </CardTitle>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  Level 4
                </Badge>
              </div>
              <CardDescription>Earn rewards through eco-friendly choices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Progress</span>
                    <span className="font-medium">420 / 500 points</span>
                  </div>
                  <div className="eco-progress">
                    <div className="eco-progress-bar bg-green-500" style={{ width: "84%" }}></div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-60 rounded-lg p-3 border border-green-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm font-medium">Current Discount</span>
                    </div>
                    <span className="text-sm font-bold text-green-700">7%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">On applicable premiums</p>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">View Eco Program</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
