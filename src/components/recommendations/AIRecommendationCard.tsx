
import { InsuranceRecommendation } from '@/api/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, Info, Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AIRecommendationCardProps {
  recommendation: InsuranceRecommendation;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({ recommendation }) => {
  return (
    <Card className={`border-l-4 border-insurance-${recommendation.type} overflow-hidden`}>
      <div className="absolute top-0 right-0 p-1">
        <Badge variant="outline" className="flex items-center gap-1 bg-background/80 backdrop-blur-sm">
          <Sparkles className="h-3 w-3 text-yellow-500" />
          AI Recommended
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {recommendation.title}
            </CardTitle>
            <CardDescription>{recommendation.company}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Match Score</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on your profile data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="font-medium text-sm">{recommendation.matchScore}%</span>
        </div>
        <Progress value={recommendation.matchScore} className="h-2" />
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <div className="text-sm text-muted-foreground">Monthly Premium</div>
            <div className="font-semibold">${recommendation.premium}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Coverage</div>
            <div className="font-semibold">${recommendation.coverage.toLocaleString()}</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Key Features:</h4>
          <ul className="space-y-1">
            {recommendation.keyFeatures.map((feature, index) => (
              <li key={index} className="text-sm flex items-start">
                <Check className="h-4 w-4 mr-1 text-green-500 mt-0.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-muted/50 rounded-md p-3">
          <h4 className="text-sm font-medium mb-1">Why AI Recommended This:</h4>
          <ul className="space-y-1">
            {recommendation.relevantFactors.map((factor, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-muted-foreground">• {factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};
