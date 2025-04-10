
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Footprints, CheckCircle2 } from "lucide-react";

interface EcoActivityCardProps {
  title: string;
  description: string;
  pointsEarned: number;
  maxPoints: number;
  co2Saved: number;
  isCompleted: boolean;
  category: "transport" | "energy" | "lifestyle";
}

const EcoActivityCard = ({
  title,
  description,
  pointsEarned,
  maxPoints,
  co2Saved,
  isCompleted,
  category,
}: EcoActivityCardProps) => {
  const getCategoryColor = () => {
    switch (category) {
      case "transport":
        return "bg-blue-500";
      case "energy":
        return "bg-green-500";
      case "lifestyle":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryLabel = () => {
    switch (category) {
      case "transport":
        return "Transport";
      case "energy":
        return "Energy";
      case "lifestyle":
        return "Lifestyle";
      default:
        return "Other";
    }
  };

  const progressPercentage = (pointsEarned / maxPoints) * 100;

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getCategoryColor()}`} />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge variant="outline" className="border-green-500 text-green-600">
            {getCategoryLabel()}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {pointsEarned} / {maxPoints} points
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-1.5 rounded-full">
              <Leaf className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-sm">
              <span className="font-medium text-green-600">{co2Saved} kg</span> CO₂ saved
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {isCompleted ? (
          <Button disabled variant="outline" className="w-full text-green-600 border-green-500">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            <span>Completed</span>
          </Button>
        ) : (
          <Button variant="outline" className="w-full">
            <Footprints className="h-4 w-4 mr-2" />
            <span>Log Activity</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EcoActivityCard;
