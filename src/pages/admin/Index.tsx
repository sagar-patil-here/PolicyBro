
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/dashboard/StatCard";
import { 
  BarChart3, 
  Users,
  ShieldAlert,
  Activity,
  Database,
  Server,
  Globe,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  ArrowUpRight,
  ChevronRight,
  UserCog,
  Clock,
  Search,
  Layers,
  Shield
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <ShieldAlert className="mr-2 h-4 w-4" />
            Security Center
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Users"
          value="12,874"
          trend={{ value: 8, isPositive: true }}
          description="+248 this month"
          icon={<Users className="h-4 w-4 text-blue-500" />}
        />
        <StatCard
          title="System Health"
          value="98.7%"
          trend={{ value: 0.5, isPositive: true }}
          description="Uptime last 30 days"
          icon={<Activity className="h-4 w-4 text-green-500" />}
        />
        <StatCard
          title="Security Alerts"
          value="4"
          trend={{ value: 12, isPositive: false }}
          description="2 high priority"
          icon={<ShieldAlert className="h-4 w-4 text-red-500" />}
        />
        <StatCard
          title="API Requests"
          value="2.4M"
          trend={{ value: 15, isPositive: true }}
          description="This month"
          icon={<Database className="h-4 w-4 text-violet-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>System Activity</CardTitle>
                <Tabs defaultValue="24h">
                  <TabsList>
                    <TabsTrigger value="24h">24h</TabsTrigger>
                    <TabsTrigger value="7d">7d</TabsTrigger>
                    <TabsTrigger value="30d">30d</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[350px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/60" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Chart showing system activity, API usage, and user engagement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>Server health and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Disk Usage</span>
                      <span>56%</span>
                    </div>
                    <Progress value={56} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Network Load</span>
                      <span>24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Server className="mr-2 h-4 w-4" />
                  Server Details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Performance</CardTitle>
                <CardDescription>Response time and reliability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Authentication", time: "67ms", status: "healthy" },
                    { name: "Policy Engine", time: "123ms", status: "healthy" },
                    { name: "User Management", time: "86ms", status: "healthy" },
                    { name: "Payment Gateway", time: "215ms", status: "warning" },
                    { name: "Analytics", time: "158ms", status: "healthy" },
                  ].map((api) => (
                    <div key={api.name} className="flex justify-between items-center">
                      <div className="text-sm">{api.name}</div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">{api.time}</span>
                        {api.status === "healthy" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : api.status === "warning" ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Globe className="mr-2 h-4 w-4" />
                  API Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="space-y-0 pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Security Overview</CardTitle>
                <Badge variant="destructive">2 High Priority</Badge>
              </div>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-4">
                {[
                  { 
                    title: "Suspicious Login Attempt", 
                    description: "Multiple failed logins from IP 172.16.254.1",
                    time: "Today, 14:32", 
                    severity: "high" 
                  },
                  { 
                    title: "Security Update Required", 
                    description: "System requires security patch KB283742",
                    time: "Today, 10:15", 
                    severity: "high" 
                  },
                  { 
                    title: "Administrator Password Expiring", 
                    description: "Admin password expires in 3 days",
                    time: "Today, 08:45", 
                    severity: "medium" 
                  },
                  { 
                    title: "User Access Review", 
                    description: "Quarterly access review pending",
                    time: "Yesterday, 16:20", 
                    severity: "medium" 
                  },
                ].map((alert, i) => (
                  <div key={i} className="flex items-start space-x-4 px-4 py-3 border-b last:border-0">
                    <div className={`p-1 rounded-full ${
                      alert.severity === "high" ? "bg-red-100" : "bg-yellow-100"
                    }`}>
                      <ShieldAlert className={`h-5 w-5 ${
                        alert.severity === "high" ? "text-red-500" : "text-yellow-500"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.description}</div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Security Center</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Most active users in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-4">
                {[
                  { name: "Admin User", role: "System Administrator", actions: 47 },
                  { name: "John Smith", role: "Company Manager", actions: 34 },
                  { name: "Emma Davis", role: "Customer Service", actions: 28 },
                  { name: "Michael Wong", role: "Data Analyst", actions: 26 },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="bg-muted rounded-full h-8 w-8 flex items-center justify-center">
                        <UserCog className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.role}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{user.actions} actions</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                User Management
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current service status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Frontend Application", status: "operational" },
                  { name: "Authentication Service", status: "operational" },
                  { name: "Database Cluster", status: "operational" },
                  { name: "Payment Processing", status: "partial" },
                  { name: "Email Service", status: "operational" },
                ].map((service) => (
                  <div key={service.name} className="flex justify-between items-center">
                    <div className="text-sm">{service.name}</div>
                    {service.status === "operational" ? (
                      <Badge className="bg-green-500">Operational</Badge>
                    ) : service.status === "partial" ? (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">Partial Outage</Badge>
                    ) : (
                      <Badge variant="destructive">Downtime</Badge>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Status Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Logs</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search Logs
              </Button>
              <Button variant="ghost" size="sm" className="text-sm">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-muted-foreground">Timestamp</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Service</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Message</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">User</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    timestamp: "2025-04-10 14:47:32",
                    type: "info",
                    service: "Authentication",
                    message: "Successful login",
                    user: "john.smith",
                  },
                  {
                    timestamp: "2025-04-10 14:32:18",
                    type: "warning",
                    service: "Payment Gateway",
                    message: "Payment processing delay",
                    user: "system",
                  },
                  {
                    timestamp: "2025-04-10 14:15:05",
                    type: "error",
                    service: "API Gateway",
                    message: "Rate limit exceeded",
                    user: "api.client",
                  },
                  {
                    timestamp: "2025-04-10 14:02:56",
                    type: "info",
                    service: "User Management",
                    message: "User profile updated",
                    user: "emma.davis",
                  },
                  {
                    timestamp: "2025-04-10 13:58:22",
                    type: "info",
                    service: "Database",
                    message: "Backup completed successfully",
                    user: "system",
                  },
                ].map((log, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 text-sm">{log.timestamp}</td>
                    <td className="py-3">
                      {log.type === "error" ? (
                        <Badge variant="destructive">Error</Badge>
                      ) : log.type === "warning" ? (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">Warning</Badge>
                      ) : (
                        <Badge variant="outline">Info</Badge>
                      )}
                    </td>
                    <td className="py-3 text-sm">{log.service}</td>
                    <td className="py-3 text-sm">{log.message}</td>
                    <td className="py-3 text-sm">{log.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
