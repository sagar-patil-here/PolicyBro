// MongoDB Atlas Configuration
export const MONGODB_URI = 'mongodb+srv://sagarpatil22112004:lMzPN4fIuiQTBfcv@policypro.r9vaghj.mongodb.net/?retryWrites=true&w=majority&appName=policypro';

// API endpoints for the Express server
export const API_BASE_URL = 'http://localhost:5000/api';

export const apiEndpoints = {
  // Authentication endpoints
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  logout: `${API_BASE_URL}/auth/logout`,
  
  // User profile endpoints
  getUserProfile: `${API_BASE_URL}/user/profile`,
  updateUserProfile: `${API_BASE_URL}/user/profile`,
  
  // AI recommendation endpoints
  getRecommendations: `${API_BASE_URL}/recommendations`,
  
  // Insurance policy endpoints
  getPolicies: `${API_BASE_URL}/policies`,
  getPolicy: (id: string) => `${API_BASE_URL}/policies/${id}`,
  
  // Claims endpoints
  getClaims: `${API_BASE_URL}/claims`,
  createClaim: `${API_BASE_URL}/claims`,
  updateClaim: (id: string) => `${API_BASE_URL}/claims/${id}`,
};

// Direct connection to MongoDB for development
// In production, this would be handled by the backend server
import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;
let connectionError: Error | null = null;

export const getMongoClient = async () => {
  // If we've already tried to connect and failed, don't keep trying
  if (connectionError) {
    console.warn('Using fallback data due to previous MongoDB connection failure');
    throw connectionError;
  }
  
  if (!client) {
    try {
      console.log('Attempting to connect to MongoDB Atlas...');
      client = new MongoClient(MONGODB_URI);
      await client.connect();
      console.log('Successfully connected to MongoDB Atlas');
    } catch (error) {
      connectionError = error as Error;
      console.error('Failed to connect to MongoDB:', error);
      console.log('Will use fallback data instead');
      throw error;
    }
  }
  return client;
};

export const getCollection = async (collectionName: string) => {
  try {
    const client = await getMongoClient();
    const db = client.db('policypro');
    return db.collection(collectionName);
  } catch (error) {
    console.error(`Failed to get collection ${collectionName}:`, error);
    throw error;
  }
};
