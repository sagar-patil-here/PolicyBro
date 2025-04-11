
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
  loginUser, 
  registerUser, 
  logoutUser,
  isAuthenticated as checkAuth,
  getCurrentUser,
  saveAuthData,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse
} from '../api/authService';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false, message: 'Auth context not initialized' }),
  register: async () => ({ success: false, message: 'Auth context not initialized' }),
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);
    
    if (authStatus) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await loginUser(credentials);
      
      if (response.success && response.token && response.user) {
        setIsAuthenticated(true);
        setUser(response.user);
        saveAuthData(response.token, response.user);
      }
      
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await registerUser(credentials);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await logoutUser();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
