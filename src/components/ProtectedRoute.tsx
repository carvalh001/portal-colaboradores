import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, hasAnyRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Layout>{children}</Layout>;
}
