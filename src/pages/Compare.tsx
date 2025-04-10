
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, XCircle, HelpCircle, ArrowRightLeft, Filter, Plus, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import RecommendationCard from "@/components/dashboard/RecommendationCard";

const Compare = () => {
  const [policyType, setPolicyType] = useState("auto");
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>(["policy1", "policy2"]);

  const policyTypes = [
    { id: "auto", name: "Auto Insurance" },
    { id: "home", name: "Home Insurance" },
    { id: "health", name: "Health Insurance" },
    { id: "life", name: "Life Insurance" },
    { id: "travel", name: "Travel Insurance" },
  ];

  // Sample recommendations data for each insurance type
  const recommendations = {
    auto: [
      {
        title: "Premium Auto Cover",
        company: "SafeDrive Insurance Co.",
        premium: 125,
        savings: 30,
        reasons: [
          "Best coverage for your driving profile",
          "Lower rates based on your safe driving history",
          "Includes roadside assistance"
        ],
        matchPercentage: 92
      },
      {
        title: "Young Driver Protection",
        company: "ValueDrive Insurance",
        premium: 145,
        savings: 15,
        reasons: [
          "Tailored for drivers under 30",
          "Accident forgiveness feature",
          "Includes new car replacement"
        ],
        matchPercentage: 85
      }
    ],
    home: [
      {
        title: "Complete Home Shield",
        company: "HomeSecure Insurance",
        premium: 95,
        savings: 25,
        reasons: [
          "Full coverage for your property value",
          "Includes flood and natural disaster protection",
          "24/7 emergency assistance"
        ],
        matchPercentage: 94
      },
      {
        title: "Renter's Ultimate Protection",
        company: "UrbanCover Inc.",
        premium: 55,
        savings: 15,
        reasons: [
          "Perfect for urban apartments",
          "Personal property replacement coverage",
          "Liability protection included"
        ],
        matchPercentage: 89
      }
    ],
    health: [
      {
        title: "Family Health Complete",
        company: "VitalCare Insurance",
        premium: 340,
        savings: 75,
        reasons: [
          "Comprehensive family coverage",
          "Low deductibles on common procedures",
          "Includes dental and vision coverage"
        ],
        matchPercentage: 91
      },
      {
        title: "Individual Premium Health",
        company: "WellBeing Health",
        premium: 210,
        savings: 45,
        reasons: [
          "Tailored for individual needs",
          "Large network of specialists",
          "Mental health coverage included"
        ],
        matchPercentage: 87
      }
    ],
    life: [
      {
        title: "Term Life Plus",
        company: "SecureFuture Insurance",
        premium: 65,
        savings: 20,
        reasons: [
          "20-year term with locked rates",
          "Higher coverage for lower premiums",
          "Convertible to permanent policy"
        ],
        matchPercentage: 95
      },
      {
        title: "Whole Life Protection",
        company: "Heritage Life Co.",
        premium: 120,
        savings: 0,
        reasons: [
          "Lifelong coverage and protection",
          "Builds cash value over time",
          "Guaranteed death benefit"
        ],
        matchPercentage: 88
      }
    ],
    travel: [
      {
        title: "Global Traveler Shield",
        company: "WorldWide Insurance",
        premium: 45,
        savings: 15,
        reasons: [
          "Comprehensive international coverage",
          "Includes emergency medical evacuation",
          "Trip cancellation protection"
        ],
        matchPercentage: 93
      },
      {
        title: "Business Travel Pro",
        company: "Corporate Shield Inc.",
        premium: 55,
        savings: 10,
        reasons: [
          "Designed for frequent business travelers",
          "Equipment and luggage protection",
          "Travel delay reimbursement"
        ],
        matchPercentage: 89
      }
    ]
  };

  const policies = {
    auto: [
      {
        id: "policy1",
        name: "Premium Auto Cover",
        company: "SafeDrive Insurance Co.",
        premium: 125,
        coverage: 250000,
        deductible: 500,
        benefits: [
          { id: "b1", name: "Accident Coverage", included: true },
          { id: "b2", name: "Theft Protection", included: true },
          { id: "b3", name: "Roadside Assistance", included: true },
          { id: "b4", name: "Rental Car Coverage", included: true },
          { id: "b5", name: "Glass Coverage", included: false },
          { id: "b6", name: "Gap Insurance", included: false },
          { id: "b7", name: "Medical Payments", included: true },
        ],
        rating: 4.5,
        reviewCount: 237,
      },
      {
        id: "policy2",
        name: "Standard Auto Plan",
        company: "ValueDrive Insurance",
        premium: 95,
        coverage: 150000,
        deductible: 1000,
        benefits: [
          { id: "b1", name: "Accident Coverage", included: true },
          { id: "b2", name: "Theft Protection", included: true },
          { id: "b3", name: "Roadside Assistance", included: false },
          { id: "b4", name: "Rental Car Coverage", included: false },
          { id: "b5", name: "Glass Coverage", included: false },
          { id: "b6", name: "Gap Insurance", included: false },
          { id: "b7", name: "Medical Payments", included: false },
        ],
        rating: 3.8,
        reviewCount: 156,
      },
      {
        id: "policy3",
        name: "Comprehensive Elite",
        company: "PremiumShield Auto",
        premium: 165,
        coverage: 350000,
        deductible: 250,
        benefits: [
          { id: "b1", name: "Accident Coverage", included: true },
          { id: "b2", name: "Theft Protection", included: true },
          { id: "b3", name: "Roadside Assistance", included: true },
          { id: "b4", name: "Rental Car Coverage", included: true },
          { id: "b5", name: "Glass Coverage", included: true },
          { id: "b6", name: "Gap Insurance", included: true },
          { id: "b7", name: "Medical Payments", included: true },
        ],
        rating: 4.9,
        reviewCount: 312,
      },
    ],
    home: [
      {
        id: "home1",
        name: "Essential Home Protection",
        company: "HomeSecure Insurance",
        premium: 85,
        coverage: 350000,
        deductible: 1000,
        benefits: [
          { id: "hb1", name: "Dwelling Coverage", included: true },
          { id: "hb2", name: "Personal Property", included: true },
          { id: "hb3", name: "Liability Protection", included: true },
          { id: "hb4", name: "Additional Living Expenses", included: true },
          { id: "hb5", name: "Water Damage", included: false },
          { id: "hb6", name: "Jewelry Protection", included: false },
          { id: "hb7", name: "Flood Insurance", included: false },
        ],
        rating: 4.2,
        reviewCount: 189,
      },
      {
        id: "home2",
        name: "Premium Home Shield",
        company: "FamilyGuard Home Insurance",
        premium: 120,
        coverage: 500000,
        deductible: 750,
        benefits: [
          { id: "hb1", name: "Dwelling Coverage", included: true },
          { id: "hb2", name: "Personal Property", included: true },
          { id: "hb3", name: "Liability Protection", included: true },
          { id: "hb4", name: "Additional Living Expenses", included: true },
          { id: "hb5", name: "Water Damage", included: true },
          { id: "hb6", name: "Jewelry Protection", included: true },
          { id: "hb7", name: "Flood Insurance", included: false },
        ],
        rating: 4.7,
        reviewCount: 256,
      }
    ],
    health: [
      {
        id: "health1",
        name: "Basic Health Plan",
        company: "VitalCare Insurance",
        premium: 210,
        coverage: "80% after deductible",
        deductible: 2500,
        benefits: [
          { id: "med1", name: "Primary Care Visits", included: true },
          { id: "med2", name: "Specialist Visits", included: true },
          { id: "med3", name: "Prescription Coverage", included: true },
          { id: "med4", name: "Hospitalization", included: true },
          { id: "med5", name: "Dental Coverage", included: false },
          { id: "med6", name: "Vision Coverage", included: false },
          { id: "med7", name: "Mental Health", included: false },
        ],
        rating: 3.9,
        reviewCount: 312,
      },
      {
        id: "health2",
        name: "Premium Health Coverage",
        company: "WellBeing Health",
        premium: 340,
        coverage: "90% after deductible",
        deductible: 1500,
        benefits: [
          { id: "med1", name: "Primary Care Visits", included: true },
          { id: "med2", name: "Specialist Visits", included: true },
          { id: "med3", name: "Prescription Coverage", included: true },
          { id: "med4", name: "Hospitalization", included: true },
          { id: "med5", name: "Dental Coverage", included: true },
          { id: "med6", name: "Vision Coverage", included: true },
          { id: "med7", name: "Mental Health", included: true },
        ],
        rating: 4.6,
        reviewCount: 289,
      }
    ],
    life: [
      {
        id: "life1",
        name: "Term Life Basic",
        company: "SecureFuture Insurance",
        premium: 45,
        coverage: 250000,
        deductible: 0,
        benefits: [
          { id: "life1", name: "Death Benefit", included: true },
          { id: "life2", name: "Level Premium", included: true },
          { id: "life3", name: "Convertible Option", included: true },
          { id: "life4", name: "Accelerated Benefits", included: false },
          { id: "life5", name: "Cash Value", included: false },
          { id: "life6", name: "Dividend Payments", included: false },
          { id: "life7", name: "Rider Options", included: false },
        ],
        rating: 4.1,
        reviewCount: 156,
      },
      {
        id: "life2",
        name: "Whole Life Protection",
        company: "Heritage Life Co.",
        premium: 120,
        coverage: 500000,
        deductible: 0,
        benefits: [
          { id: "life1", name: "Death Benefit", included: true },
          { id: "life2", name: "Level Premium", included: true },
          { id: "life3", name: "Convertible Option", included: false },
          { id: "life4", name: "Accelerated Benefits", included: true },
          { id: "life5", name: "Cash Value", included: true },
          { id: "life6", name: "Dividend Payments", included: true },
          { id: "life7", name: "Rider Options", included: true },
        ],
        rating: 4.5,
        reviewCount: 203,
      }
    ],
    travel: [
      {
        id: "travel1",
        name: "Basic Travel Insurance",
        company: "WorldWide Insurance",
        premium: 35,
        coverage: 50000,
        deductible: 250,
        benefits: [
          { id: "t1", name: "Emergency Medical", included: true },
          { id: "t2", name: "Trip Cancellation", included: true },
          { id: "t3", name: "Lost Luggage", included: true },
          { id: "t4", name: "Travel Delay", included: false },
          { id: "t5", name: "Adventure Activities", included: false },
          { id: "t6", name: "Rental Car Coverage", included: false },
          { id: "t7", name: "24/7 Assistance", included: true },
        ],
        rating: 4.0,
        reviewCount: 142,
      },
      {
        id: "travel2",
        name: "Premium Travel Protection",
        company: "Global Travelers Inc.",
        premium: 65,
        coverage: 100000,
        deductible: 100,
        benefits: [
          { id: "t1", name: "Emergency Medical", included: true },
          { id: "t2", name: "Trip Cancellation", included: true },
          { id: "t3", name: "Lost Luggage", included: true },
          { id: "t4", name: "Travel Delay", included: true },
          { id: "t5", name: "Adventure Activities", included: true },
          { id: "t6", name: "Rental Car Coverage", included: true },
          { id: "t7", name: "24/7 Assistance", included: true },
        ],
        rating: 4.8,
        reviewCount: 219,
      }
    ],
  };

  const availablePolicies = policies[policyType as keyof typeof policies] || [];
  const selectedPolicyData = availablePolicies.filter(policy => selectedPolicies.includes(policy.id));
  const currentRecommendations = recommendations[policyType as keyof typeof recommendations] || [];

  const handleAddPolicy = (policyId: string) => {
    if (selectedPolicies.length < 3) {
      setSelectedPolicies([...selectedPolicies, policyId]);
    }
  };

  const handleRemovePolicy = (policyId: string) => {
    setSelectedPolicies(selectedPolicies.filter(id => id !== policyId));
  };

  const renderChecklist = (benefits: { id: string; name: string; included: boolean }[]) => {
    return benefits.map((benefit) => (
      <div key={benefit.id} className="flex justify-between py-2 border-b last:border-0">
        <span className="text-sm">{benefit.name}</span>
        {benefit.included ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
      </div>
    ));
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compare Policies</h1>
          <p className="text-muted-foreground">
            Side-by-side comparison of insurance policies to find your best match.
          </p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>Insurance policies tailored to your profile and needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRecommendations.map((recommendation, index) => (
              <RecommendationCard
                key={index}
                type={policyType as "auto" | "home" | "life" | "health" | "travel"}
                title={recommendation.title}
                company={recommendation.company}
                premium={recommendation.premium}
                savings={recommendation.savings}
                reasons={recommendation.reasons}
                matchPercentage={recommendation.matchPercentage}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Choose policies to compare</CardTitle>
          <CardDescription>Select the type of insurance and up to 3 policies to compare</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs 
            value={policyType} 
            onValueChange={setPolicyType}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 mb-6">
              {policyTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id}>{type.name}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search policies..." className="pl-8" />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Select defaultValue="premium">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="premium">Premium: Low to High</SelectItem>
                  <SelectItem value="premium-desc">Premium: High to Low</SelectItem>
                  <SelectItem value="coverage">Coverage: Low to High</SelectItem>
                  <SelectItem value="coverage-desc">Coverage: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {availablePolicies.map((policy) => (
              <Card key={policy.id} className={`overflow-hidden card-hover ${selectedPolicies.includes(policy.id) ? 'border-primary' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{policy.name}</CardTitle>
                      <CardDescription>{policy.company}</CardDescription>
                    </div>
                    {selectedPolicies.includes(policy.id) ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-2"
                        onClick={() => handleRemovePolicy(policy.id)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:text-primary/80 -mt-1 -mr-2"
                        onClick={() => handleAddPolicy(policy.id)}
                        disabled={selectedPolicies.length >= 3}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly premium</span>
                      <span className="font-medium">${policy.premium}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-medium">
                        {typeof policy.coverage === 'number' ? 
                          `$${policy.coverage.toLocaleString()}` : 
                          policy.coverage}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deductible</span>
                      <span className="font-medium">${policy.deductible}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-medium">{policy.rating} ⭐️ ({policy.reviewCount} reviews)</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="text-xs text-muted-foreground">
                    {policy.benefits.filter(b => b.included).length} of {policy.benefits.length} benefits included
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedPolicyData.length >= 2 && (
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Policy Comparison</CardTitle>
              <Button variant="outline" size="sm">
                <ArrowRightLeft className="h-4 w-4 mr-1" />
                Swap
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid" style={{ gridTemplateColumns: `180px repeat(${selectedPolicyData.length}, 1fr)` }}>
              {/* Header row */}
              <div className="border-b bg-muted p-4 font-medium">Feature</div>
              {selectedPolicyData.map((policy) => (
                <div key={policy.id} className="border-b border-l bg-muted p-4 font-medium text-center">
                  {policy.name}
                </div>
              ))}
              
              {/* Premium row */}
              <div className="border-b p-4 flex items-center">
                <span>Monthly Premium</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Monthly cost of the insurance policy</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {selectedPolicyData.map((policy) => (
                <div key={policy.id} className="border-b border-l p-4 text-center font-medium">
                  ${policy.premium}
                </div>
              ))}
              
              {/* Coverage row */}
              <div className="border-b p-4 flex items-center">
                <span>Coverage Limit</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Maximum amount insurer will pay</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {selectedPolicyData.map((policy) => (
                <div key={policy.id} className="border-b border-l p-4 text-center font-medium">
                  {typeof policy.coverage === 'number' ? 
                    `$${policy.coverage.toLocaleString()}` : 
                    policy.coverage}
                </div>
              ))}
              
              {/* Deductible row */}
              <div className="border-b p-4 flex items-center">
                <span>Deductible</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Amount you pay before insurance covers</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {selectedPolicyData.map((policy) => (
                <div key={policy.id} className="border-b border-l p-4 text-center font-medium">
                  ${policy.deductible}
                </div>
              ))}
              
              {/* Rating row */}
              <div className="border-b p-4 flex items-center">
                <span>Customer Rating</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Average rating from customers</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {selectedPolicyData.map((policy) => (
                <div key={policy.id} className="border-b border-l p-4 text-center">
                  <span className="font-medium">{policy.rating}</span>/5 ({policy.reviewCount} reviews)
                </div>
              ))}
              
              {/* Benefits header */}
              <div className="border-b p-4 font-medium">Key Benefits</div>
              {selectedPolicyData.map((policy) => (
                <div key={policy.id} className="border-b border-l p-4 text-center font-medium">
                  Coverage Details
                </div>
              ))}
              
              {/* Benefits checklist */}
              <div className="p-4">
                <div className="space-y-2">
                  {selectedPolicyData[0]?.benefits.map((benefit) => (
                    <div key={benefit.id} className="py-2 border-b last:border-0">
                      <span className="text-sm">{benefit.name}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 ml-1 text-muted-foreground inline" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Details about {benefit.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
              </div>
              {selectedPolicyData.map((policy) => (
                <div key={policy.id} className="border-l p-4">
                  {renderChecklist(policy.benefits)}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline">Download Comparison</Button>
            <Button>Get Quotes</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Compare;
