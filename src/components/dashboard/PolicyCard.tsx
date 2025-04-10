
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

interface PolicyCardProps {
  type: "auto" | "home" | "life" | "health" | "travel";
  title: string;
  company: string;
  policyNumber: string;
  premium: number;
  nextPayment: string;
  daysUntilRenewal: number;
  status: "active" | "pending" | "review" | "expired";
}

const PolicyCard = ({
  type,
  title,
  company,
  policyNumber,
  premium,
  nextPayment,
  daysUntilRenewal,
  status,
}: PolicyCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case "review":
        return <Badge variant="outline" className="text-orange-500 border-orange-500">Under Review</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return null;
    }
  };
  
  const getTypeColor = () => {
    return `bg-insurance-${type}`;
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getTypeColor()}`} />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription>{company}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Policy No.</span>
            <span className="font-medium">{policyNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Premium</span>
            <span className="font-medium">${premium}/month</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next Payment</span>
            <span className="font-medium">{nextPayment}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center text-sm">
              <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>Renewal in {daysUntilRenewal} days</span>
            </div>
            {daysUntilRenewal < 30 && (
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            )}
          </div>
          <Progress value={(100 - (daysUntilRenewal / 365 * 100))} 
            className={`h-1.5 ${daysUntilRenewal < 30 ? 'bg-yellow-500' : `bg-insurance-${type}`}`} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PolicyCard;
