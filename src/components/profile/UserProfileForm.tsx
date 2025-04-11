
import { useState } from 'react';
import { UserProfile } from '@/api/types';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const UserProfileForm = () => {
  const { userProfile: existingProfile, saveProfile } = useUserProfile();
  
  const defaultProfile: UserProfile = {
    name: '',
    email: '',
    age: 30,
    occupation: '',
    income: 70000,
    assets: {
      home: false,
      car: true,
      otherVehicles: false,
    },
    familyStatus: 'Single',
    healthConditions: [],
    riskTolerance: 'medium',
    location: {
      city: '',
      state: '',
      zipCode: '',
    }
  };
  
  const [profile, setProfile] = useState<UserProfile>(existingProfile || defaultProfile);

  const [healthCondition, setHealthCondition] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof UserProfile] as Record<string, any>),
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else if (type === 'checkbox') {
      setProfile((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAssetChange = (key: keyof UserProfile['assets'], checked: boolean) => {
    setProfile((prev) => ({
      ...prev,
      assets: {
        ...prev.assets,
        [key]: checked
      }
    }));
  };

  const addHealthCondition = () => {
    if (healthCondition && !profile.healthConditions.includes(healthCondition)) {
      setProfile((prev) => ({
        ...prev,
        healthConditions: [...prev.healthConditions, healthCondition]
      }));
      setHealthCondition('');
    }
  };
  
  const removeHealthCondition = (condition: string) => {
    setProfile((prev) => ({
      ...prev,
      healthConditions: prev.healthConditions.filter(c => c !== condition)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!profile.name || !profile.email || !profile.occupation) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    saveProfile(profile);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Complete your profile to get personalized insurance recommendations</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  max="100"
                  value={profile.age}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation*</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={profile.occupation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Financial Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="income">Annual Income ($)</Label>
              <Input
                id="income"
                name="income"
                type="number"
                min="0"
                step="1000"
                value={profile.income}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Assets</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="assetHome"
                    checked={profile.assets.home}
                    onCheckedChange={(checked) => 
                      handleAssetChange('home', checked === true)
                    }
                  />
                  <Label htmlFor="assetHome">Own a Home</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="assetCar"
                    checked={profile.assets.car}
                    onCheckedChange={(checked) => 
                      handleAssetChange('car', checked === true)
                    }
                  />
                  <Label htmlFor="assetCar">Own a Car</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="assetOtherVehicles"
                    checked={profile.assets.otherVehicles}
                    onCheckedChange={(checked) => 
                      handleAssetChange('otherVehicles', checked === true)
                    }
                  />
                  <Label htmlFor="assetOtherVehicles">Other Vehicles</Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Circumstances</h3>
            
            <div className="space-y-2">
              <Label htmlFor="familyStatus">Family Status</Label>
              <Select
                value={profile.familyStatus}
                onValueChange={(value) => 
                  setProfile((prev) => ({ ...prev, familyStatus: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select family status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Married with children">Married with children</SelectItem>
                  <SelectItem value="Single parent">Single parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Health Conditions</Label>
              <div className="flex space-x-2">
                <Input
                  value={healthCondition}
                  onChange={(e) => setHealthCondition(e.target.value)}
                  placeholder="Add health condition"
                  className="flex-1"
                />
                <Button type="button" variant="secondary" onClick={addHealthCondition}>
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.healthConditions.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {condition}
                    <button
                      type="button"
                      onClick={() => removeHealthCondition(condition)}
                      className="ml-1 rounded-full w-4 h-4 inline-flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {profile.healthConditions.length === 0 && (
                  <span className="text-sm text-muted-foreground">No health conditions added</span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Risk Tolerance</Label>
              <RadioGroup
                value={profile.riskTolerance}
                onValueChange={(value) => 
                  setProfile((prev) => ({
                    ...prev,
                    riskTolerance: value as 'low' | 'medium' | 'high'
                  }))
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="risk-low" />
                  <Label htmlFor="risk-low">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="risk-medium" />
                  <Label htmlFor="risk-medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="risk-high" />
                  <Label htmlFor="risk-high">High</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Location</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="location.city"
                  value={profile.location.city}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="location.state"
                  value={profile.location.state}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="location.zipCode"
                  value={profile.location.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => history.back()}>
            Cancel
          </Button>
          <Button type="submit">Save Profile</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UserProfileForm;
