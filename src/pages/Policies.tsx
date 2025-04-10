
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PolicyCard from "@/components/dashboard/PolicyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, PlusCircle, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Policies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string[]>(["auto", "home", "health", "life", "travel"]);
  const [filterStatus, setFilterStatus] = useState<string[]>(["active", "pending", "review", "expired"]);

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
    {
      type: "travel" as const,
      title: "Travel Insurance (Europe)",
      company: "Global Travel Protect",
      policyNumber: "TRVL-93827",
      premium: 45,
      nextPayment: "July 10, 2025",
      daysUntilRenewal: 92,
      status: "active" as const,
    },
    {
      type: "life" as const,
      title: "Term Life Insurance",
      company: "FamilyCare Life",
      policyNumber: "LIFE-74920",
      premium: 85,
      nextPayment: "June 15, 2025",
      daysUntilRenewal: 67,
      status: "pending" as const,
    },
    {
      type: "auto" as const,
      title: "Motorcycle Insurance",
      company: "BikeShield Insurance",
      policyNumber: "MOTO-38726",
      premium: 60,
      nextPayment: "April 22, 2025",
      daysUntilRenewal: 12,
      status: "expired" as const,
    },
  ];

  const filteredPolicies = policies.filter(
    (policy) =>
      (policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      filterType.includes(policy.type) &&
      filterStatus.includes(policy.status)
  );

  const toggleFilterType = (type: string) => {
    setFilterType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleFilterStatus = (status: string) => {
    setFilterStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const activePolicies = filteredPolicies.filter((policy) => policy.status === "active");
  const otherPolicies = filteredPolicies.filter((policy) => policy.status !== "active");

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Policies</h1>
          <p className="text-muted-foreground">Manage all your insurance policies in one place.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Policy
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search policies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Policy Type</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filterType.includes("auto")}
              onCheckedChange={() => toggleFilterType("auto")}
            >
              Auto
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterType.includes("home")}
              onCheckedChange={() => toggleFilterType("home")}
            >
              Home
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterType.includes("health")}
              onCheckedChange={() => toggleFilterType("health")}
            >
              Health
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterType.includes("life")}
              onCheckedChange={() => toggleFilterType("life")}
            >
              Life
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterType.includes("travel")}
              onCheckedChange={() => toggleFilterType("travel")}
            >
              Travel
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filterStatus.includes("active")}
              onCheckedChange={() => toggleFilterStatus("active")}
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterStatus.includes("pending")}
              onCheckedChange={() => toggleFilterStatus("pending")}
            >
              Pending
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterStatus.includes("review")}
              onCheckedChange={() => toggleFilterStatus("review")}
            >
              Under Review
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterStatus.includes("expired")}
              onCheckedChange={() => toggleFilterStatus("expired")}
            >
              Expired
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Policies</TabsTrigger>
          <TabsTrigger value="all">All Policies</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-6">
          {activePolicies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activePolicies.map((policy, index) => (
                <PolicyCard key={index} {...policy} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No active policies match your filters</p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setFilterType(["auto", "home", "health", "life", "travel"]);
                  setFilterStatus(["active", "pending", "review", "expired"]);
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Policies ({activePolicies.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {activePolicies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activePolicies.map((policy, index) => (
                    <PolicyCard key={index} {...policy} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No active policies match your filters</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Other Policies ({otherPolicies.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {otherPolicies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherPolicies.map((policy, index) => (
                    <PolicyCard key={index} {...policy} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No other policies match your filters</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Policy Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Document management coming soon</p>
                <Button variant="outline">Request Documents</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Policies;
