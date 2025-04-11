
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProfileProvider } from "./contexts/UserProfileContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Policies from "./pages/Policies";
import Compare from "./pages/Compare";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import AIRecommendations from "./pages/AIRecommendations";
import CompanyDashboard from "./pages/company/Index";
import AdminDashboard from "./pages/admin/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProfileProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Customer Routes */}
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/policies" element={<Layout><Policies /></Layout>} />
              <Route path="/compare" element={<Layout><Compare /></Layout>} />
              <Route path="/rewards" element={<Layout><Rewards /></Layout>} />
              <Route path="/profile" element={<Layout><Profile /></Layout>} />
              <Route path="/recommendations" element={<Layout><AIRecommendations /></Layout>} />

              {/* Company Routes */}
              <Route path="/company" element={<Layout><CompanyDashboard /></Layout>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />

              {/* Not Found */}
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProfileProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
