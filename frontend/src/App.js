import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { FloneoBadge } from "@/components/FloneoBadge";
import { Login } from "@/pages/Login";
import { LandlordDashboard } from "@/pages/LandlordDashboard";
import { TenantDashboard } from "@/pages/TenantDashboard";
import { AdminDashboard } from "@/pages/AdminDashboard";
import "@/App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("wbps_user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("wbps_user");
  };

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("wbps_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const getDashboardComponent = () => {
    if (!currentUser) return <Navigate to="/login" replace />;

    switch (currentUser.role) {
      case "landlord":
        return <LandlordDashboard user={currentUser} />;
      case "tenant":
        return <TenantDashboard user={currentUser} />;
      case "admin":
        return <AdminDashboard user={currentUser} />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  const userContext = {
    totalProperties: 8,
    occupancyRate: 87.5,
    monthlyIncome: 45000,
    pendingRequests: 3,
    recentProperty: "Beşiktaş",
  };

  if (!currentUser) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background">
        <Header currentUser={currentUser} onLogout={handleLogout} />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={getDashboardComponent()} />
            <Route path="/dashboard" element={getDashboardComponent()} />
            <Route path="/admin" element={getDashboardComponent()} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        {/* AI Assistant - Only for landlords and tenants */}
        {(currentUser.role === "landlord" || currentUser.role === "tenant") && (
          <AIAssistant
            isOpen={aiAssistantOpen}
            onClose={() => setAiAssistantOpen(!aiAssistantOpen)}
            userContext={userContext}
          />
        )}

        {/* Floneo Badge */}
        <FloneoBadge />

        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
