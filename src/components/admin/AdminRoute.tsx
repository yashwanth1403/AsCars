import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentSession } from "@/lib/supabase/auth";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    void getCurrentSession()
      .then((session) => {
        if (mounted) setAuthenticated(Boolean(session));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Checking session...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
