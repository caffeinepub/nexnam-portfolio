import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminLogin from '../pages/AdminLogin';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <AdminLogin />;
  }
  return <>{children}</>;
}
