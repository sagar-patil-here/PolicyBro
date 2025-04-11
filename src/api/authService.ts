
import { apiEndpoints } from './mongoConfig';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  userType?: 'customer' | 'company' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    userType: 'customer' | 'company' | 'admin';
  };
}

// This will be replaced with actual API calls once the Express backend is connected
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // Simulate API call (this will be replaced with actual fetch to Express backend)
    // Demo credentials for each user type
    if (credentials.email === "customer@example.com" && credentials.password === "password") {
      return {
        success: true,
        message: "Login successful",
        token: "demo-token-customer",
        user: {
          id: "1",
          name: "John Doe",
          email: "customer@example.com",
          userType: "customer"
        }
      };
    } else if (credentials.email === "company@example.com" && credentials.password === "password") {
      return {
        success: true,
        message: "Login successful",
        token: "demo-token-company",
        user: {
          id: "2",
          name: "Insurance Corp",
          email: "company@example.com",
          userType: "company"
        }
      };
    } else if (credentials.email === "admin@example.com" && credentials.password === "password") {
      return {
        success: true,
        message: "Login successful",
        token: "demo-token-admin",
        user: {
          id: "3",
          name: "Admin User",
          email: "admin@example.com",
          userType: "admin"
        }
      };
    } else {
      return {
        success: false,
        message: "Invalid email or password"
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: "Login failed. Please try again."
    };
  }
};

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    // This will be replaced with actual API call
    return {
      success: true,
      message: "Registration successful. Please log in.",
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: "Registration failed. Please try again."
    };
  }
};

export const logoutUser = async (): Promise<void> => {
  // This will be replaced with actual API call
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

export const getCurrentUser = (): AuthResponse['user'] | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const saveAuthData = (token: string, user: AuthResponse['user']): void => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
};
