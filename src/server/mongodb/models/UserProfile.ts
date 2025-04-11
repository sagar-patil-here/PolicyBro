
// This file will be used in the backend to define the UserProfile model
// It's included here as a reference for the MongoDB schema structure

/*
import mongoose from 'mongoose';

interface IUserProfile {
  userId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  age: number;
  occupation: string;
  income: number;
  assets: {
    home: boolean;
    car: boolean;
    otherVehicles: boolean;
  };
  familyStatus: string;
  healthConditions: string[];
  riskTolerance: 'low' | 'medium' | 'high';
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new mongoose.Schema<IUserProfile>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  occupation: { type: String, required: true },
  income: { type: Number, required: true },
  assets: {
    home: { type: Boolean, default: false },
    car: { type: Boolean, default: false },
    otherVehicles: { type: Boolean, default: false },
  },
  familyStatus: { type: String, required: true },
  healthConditions: [{ type: String }],
  riskTolerance: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UserProfile = mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);

export default UserProfile;
*/

// This is a placeholder file for the future MongoDB integration
// The actual implementation will be in the Express backend

