
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, XCircle, HelpCircle, ArrowRightLeft, Filter, Plus, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      // Home insurance policies would go here
    ],
    health: [
      // Health insurance policies would go here
    ],
    life: [
      // Life insurance policies would go here
    ],
    travel: [
      // Travel insurance policies would go here
    ],
  };

  const availablePolicies = policies[policyType as keyof typeof policies] || [];
  const selectedPolicyData = availablePolicies.filter(policy => selectedPolicies.includes(policy.id));

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
                      <span className="font-medium">${policy.coverage.toLocaleString()}</span>
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
                  ${policy.coverage.toLocaleString()}
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
