
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, FileText, ArrowUpRight } from "lucide-react";

interface ClaimCardProps {
  title: string;
  claimNumber: string;
  dateSubmitted: string;
  amount: number;
  status: "approved" | "pending" | "review" | "denied";
  progressPercentage: number;
  type: "auto" | "home" | "life" | "health" | "travel";
}

const ClaimCard = ({
  title,
  claimNumber,
  dateSubmitted,
  amount,
  status,
  progressPercentage,
  type,
}: ClaimCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case "review":
        return <Badge variant="outline" className="text-orange-500 border-orange-500">Under Review</Badge>;
      case "denied":
        return <Badge variant="destructive">Denied</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full bg-insurance-${type}`} />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Claim No.</span>
            <span className="font-medium">{claimNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Submitted</span>
            <span className="font-medium">{dateSubmitted}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-medium">${amount.toLocaleString()}</span>
          </div>

          <div className="mt-4 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <span>Claim Progress</span>
              </div>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} 
              className="h-1.5" 
              indicatorClassName={status === "denied" ? "bg-red-500" : `bg-insurance-${type}`} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">
          <FileText className="h-4 w-4 mr-2" />
          <span>View Details</span>
          <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClaimCard;
