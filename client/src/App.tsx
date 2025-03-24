import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Process from "@/pages/Process";
import OrderForm from "@/pages/OrderForm";
import FreelancerSignup from "@/pages/FreelancerSignup";
import Contact from "@/pages/Contact";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/process" component={Process} />
      <Route path="/order" component={OrderForm} />
      <Route path="/freelancer" component={FreelancerSignup} />
      <Route path="/contact" component={Contact} />
      
      {/* Admin routes */}
      <Route path="/admin" component={Login} />
      <Route path="/admin/login" component={Login} />
      <Route path="/admin/dashboard" component={Dashboard} />
      
      {/* 404 route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        {!isAdminRoute && <Navbar />}
        <main className={`flex-grow ${!isAdminRoute ? 'pt-16' : ''}`}>
          <Router />
        </main>
        {!isAdminRoute && <Footer />}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
