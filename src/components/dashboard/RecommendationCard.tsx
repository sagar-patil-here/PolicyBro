
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, ExternalLink, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

interface RecommendationCardProps {
  type: "auto" | "home" | "life" | "health" | "travel";
  title: string;
  company: string;
  premium: number;
  savings: number;
  reasons: string[];
  matchPercentage: number;
}

const RecommendationCard = ({
  type,
  title,
  company,
  premium,
  savings,
  reasons,
  matchPercentage,
}: RecommendationCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full bg-insurance-${type}`} />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge className={`bg-insurance-${type}`}>{matchPercentage}% Match</Badge>
        </div>
        <CardDescription>{company}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Premium</span>
            <span className="font-medium">${premium}/month</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Potential Savings</span>
              <span className="font-medium text-green-600">${savings}/month</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground">Why we recommend this:</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Based on your profile and preferences</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ul className="text-sm list-disc list-inside space-y-1">
            {reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => toast.success("Thanks for your feedback!")}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>Helpful</span>
        </Button>
        <Button variant="outline" size="sm" className={`text-insurance-${type}`}>
          <span>Details</span>
          <ExternalLink className="h-3.5 w-3.5 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
