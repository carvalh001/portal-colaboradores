import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Benefits from "./pages/Benefits";
import MyData from "./pages/MyData";
import Messages from "./pages/Messages";
import Employees from "./pages/admin/Employees";
import EmployeeDetail from "./pages/admin/EmployeeDetail";
import Logs from "./pages/admin/Logs";
import Users from "./pages/admin/Users";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/beneficios"
              element={
                <ProtectedRoute>
                  <Benefits />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meus-dados"
              element={
                <ProtectedRoute>
                  <MyData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mensagens"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/colaboradores"
              element={
                <ProtectedRoute requiredRoles={["GESTOR_RH", "ADMIN"]}>
                  <Employees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/colaboradores/:id"
              element={
                <ProtectedRoute requiredRoles={["GESTOR_RH", "ADMIN"]}>
                  <EmployeeDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/logs"
              element={
                <ProtectedRoute requiredRoles={["GESTOR_RH", "ADMIN"]}>
                  <Logs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/usuarios"
              element={
                <ProtectedRoute requiredRoles={["ADMIN"]}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
