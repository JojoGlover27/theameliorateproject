import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import BackToTop from "./components/BackToTop.tsx";

const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const OurStory = lazy(() => import("./pages/OurStory.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const Media = lazy(() => import("./pages/Media.tsx"));
const Resources = lazy(() => import("./pages/Resources.tsx"));
const GetInvolved = lazy(() => import("./pages/GetInvolved.tsx"));
const Research = lazy(() => import("./pages/Research.tsx"));
const NeedsAssessmentReport = lazy(() => import("./pages/research/NeedsAssessmentReport.tsx"));
const AnonymityClinicalNecessity = lazy(() => import("./pages/research/AnonymityClinicalNecessity.tsx"));
const Newsletter = lazy(() => import("./pages/Newsletter.tsx"));
const Unsubscribed = lazy(() => import("./pages/Unsubscribed.tsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminSubscribers = lazy(() => import("./pages/admin/AdminSubscribers.tsx"));
const AdminNewsletters = lazy(() => import("./pages/admin/AdminNewsletters.tsx"));
const AdminNewsletterEdit = lazy(() => import("./pages/admin/AdminNewsletterEdit.tsx"));
import RequireAdmin from "./components/admin/RequireAdmin";

const queryClient = new QueryClient();

const Fallback = () => <div className="min-h-screen" aria-hidden />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/media" element={<Media />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/access-safety-anonymity-ghana" element={<NeedsAssessmentReport />} />
            <Route path="/research/anonymity-clinical-necessity" element={<AnonymityClinicalNecessity />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
              <Route index element={<AdminDashboard />} />
              <Route path="subscribers" element={<AdminSubscribers />} />
              <Route path="newsletters" element={<AdminNewsletters />} />
              <Route path="newsletters/new" element={<AdminNewsletterEdit />} />
              <Route path="newsletters/:id" element={<AdminNewsletterEdit />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <BackToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
