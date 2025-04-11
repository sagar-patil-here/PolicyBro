
// MongoDB Atlas Configuration
export const MONGODB_URI = 'mongodb+srv://sagarpatil22112004:<db_password>@policypro.r9vaghj.mongodb.net/?retryWrites=true&w=majority&appName=policypro';

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
