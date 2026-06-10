import { lazy, Suspense } from "react";
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

const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminPackages = lazy(() => import("./pages/admin/Packages"));
const PackageForm = lazy(() => import("./pages/admin/PackageForm"));
const AdminInquiries = lazy(() => import("./pages/admin/Inquiries"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));

const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

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

            {/* Admin routes (lazy-loaded) */}
            <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout><Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/packages" element={<ProtectedAdminRoute><AdminLayout><Suspense fallback={<PageLoader />}><AdminPackages /></Suspense></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/packages/:id" element={<ProtectedAdminRoute><AdminLayout><Suspense fallback={<PageLoader />}><PackageForm /></Suspense></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/inquiries" element={<ProtectedAdminRoute><AdminLayout><Suspense fallback={<PageLoader />}><AdminInquiries /></Suspense></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/users" element={<ProtectedAdminRoute><AdminLayout><Suspense fallback={<PageLoader />}><AdminUsers /></Suspense></AdminLayout></ProtectedAdminRoute>} />
            <Route path="/admin/analytics" element={<ProtectedAdminRoute><AdminLayout><Suspense fallback={<PageLoader />}><AdminAnalytics /></Suspense></AdminLayout></ProtectedAdminRoute>} />

            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
