
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/dashboard/StatCard";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  AlertTriangle,
  CheckCircle2, 
  XCircle,
  Calendar,
  CreditCard,
  BarChart,
  LineChart,
  PieChart,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";

const CompanyDashboard = () => {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to InsureTech Partners!</p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Active Policies"
          value="3,274"
          trend={{ value: 12, isPositive: true }}
          description="+124 this month"
          icon={<FileText className="h-4 w-4 text-blue-500" />}
        />
        <StatCard
          title="Monthly Revenue"
          value="$529,408"
          trend={{ value: 8, isPositive: true }}
          description="vs last month"
          icon={<CreditCard className="h-4 w-4 text-green-500" />}
        />
        <StatCard
          title="Customer Base"
          value="2,851"
          trend={{ value: 5, isPositive: true }}
          description="+56 this month"
          icon={<Users className="h-4 w-4 text-violet-500" />}
        />
        <StatCard
          title="Claims Ratio"
          value="4.2%"
          trend={{ value: 1.2, isPositive: false }}
          description="vs last month"
          icon={<TrendingUp className="h-4 w-4 text-orange-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Policy Performance</CardTitle>
                <Tabs defaultValue="monthly">
                  <TabsList>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[350px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/60" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Chart showing monthly policy sales and revenue
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Sentiment</CardTitle>
                <CardDescription>Based on feedback and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Satisfaction</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Policy Value</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Customer Service</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Claims Process</span>
                      <span>84%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Policy Distribution</CardTitle>
                <CardDescription>Breakdown by insurance type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 mx-auto text-muted-foreground/60" />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  {[
                    { name: "Auto Insurance", value: "42%", color: "bg-insurance-auto" },
                    { name: "Home Insurance", value: "28%", color: "bg-insurance-home" },
                    { name: "Health Insurance", value: "18%", color: "bg-insurance-health" },
                    { name: "Life Insurance", value: "8%", color: "bg-insurance-life" },
                    { name: "Travel Insurance", value: "4%", color: "bg-insurance-travel" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full ${item.color} mr-2`}></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Regulatory compliance overview</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-4">
                {[
                  { name: "Policy Documentation", status: "compliant", lastUpdated: "Apr 5, 2025" },
                  { name: "Customer Data Protection", status: "compliant", lastUpdated: "Apr 1, 2025" },
                  { name: "Financial Reporting", status: "compliant", lastUpdated: "Mar 31, 2025" },
                  { name: "Risk Assessment", status: "review", lastUpdated: "Mar 15, 2025" },
                  { name: "Claims Processing", status: "compliant", lastUpdated: "Mar 20, 2025" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between items-center px-4 py-2 border-b last:border-0">
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">Updated: {item.lastUpdated}</div>
                    </div>
                    {item.status === "compliant" ? (
                      <Badge className="bg-green-500">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        Compliant
                      </Badge>
                    ) : item.status === "review" ? (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                        Under Review
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        Non-Compliant
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-4">
                {[
                  { name: "Quarterly Compliance Audit", dueDate: "Apr 15, 2025", priority: "high" },
                  { name: "Update Policy Terms", dueDate: "Apr 20, 2025", priority: "medium" },
                  { name: "Customer Feedback Review", dueDate: "Apr 22, 2025", priority: "medium" },
                  { name: "Risk Assessment Update", dueDate: "Apr 30, 2025", priority: "high" },
                ].map((task) => (
                  <div key={task.name} className="flex justify-between items-center px-4 py-3 border-b last:border-0">
                    <div>
                      <div className="font-medium text-sm">{task.name}</div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Due: {task.dueDate}
                      </div>
                    </div>
                    <Badge variant={task.priority === "high" ? "destructive" : "outline"}>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-2">
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>Industry insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Rising Demand for Cyber Insurance",
                    trend: "+18%",
                    isPositive: true,
                  },
                  {
                    title: "Climate Risk Coverage Expansion",
                    trend: "+12%",
                    isPositive: true,
                  },
                  {
                    title: "Health Plan Enrollment",
                    trend: "-3%",
                    isPositive: false,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex justify-between items-center">
                    <div className="text-sm">{item.title}</div>
                    <div
                      className={`flex items-center font-medium ${
                        item.isPositive ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {item.trend}
                      <ArrowUpRight className={`h-4 w-4 ml-1 ${!item.isPositive && "rotate-180"}`} />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Market Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activities</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "New Policy Created",
                type: "Premium Auto Insurance",
                user: "Administrator",
                time: "Today, 10:45 AM",
              },
              {
                action: "Premium Updated",
                type: "Home Insurance Base Plan",
                user: "System",
                time: "Today, 9:32 AM",
              },
              {
                action: "Compliance Check Completed",
                type: "All Active Policies",
                user: "Compliance Officer",
                time: "Yesterday, 5:16 PM",
              },
              {
                action: "Customer Data Exported",
                type: "Marketing Analysis",
                user: "Marketing Team",
                time: "Yesterday, 2:20 PM",
              },
              {
                action: "Risk Model Updated",
                type: "Auto Insurance",
                user: "Risk Management",
                time: "Apr 8, 2025, 11:05 AM",
              },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-sm text-muted-foreground">
                    {activity.type} • {activity.user}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDashboard;
