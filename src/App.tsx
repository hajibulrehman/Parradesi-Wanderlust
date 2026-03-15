import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import Index from "./pages/Index";
import Trips from "./pages/Trips";
import TripDetail from "./pages/TripDetail";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPackages from "./pages/admin/Packages";
import PackageForm from "./pages/admin/PackageForm";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminUsers from "./pages/admin/Users";
import AdminAnalytics from "./pages/admin/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/trips" element={<Layout><Trips /></Layout>} />
            <Route path="/trips/:slug" element={<Layout><TripDetail /></Layout>} />
            <Route path="/community" element={<Layout><Community /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/auth" element={<Layout><Auth /></Layout>} />

            {/* Admin routes */}
            <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/packages" element={<ProtectedAdminRoute><AdminLayout><AdminPackages /></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/packages/:id" element={<ProtectedAdminRoute><AdminLayout><PackageForm /></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/inquiries" element={<ProtectedAdminRoute><AdminLayout><AdminInquiries /></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/users" element={<ProtectedAdminRoute><AdminLayout><AdminUsers /></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/analytics" element={<ProtectedAdminRoute><AdminLayout><AdminAnalytics /></AdminLayout></ProtectedAdminRoute>} />

            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
