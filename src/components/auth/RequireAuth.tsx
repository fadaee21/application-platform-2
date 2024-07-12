import { useAuth } from "@/hooks/context/useAuth";
import { useMemo } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }: TAllowRoles) => {
  const { auth } = useAuth();
  const location = useLocation();
  const isAllowedRole = useMemo(() => {
    // console.count("test useMemo");
    // return auth?.roles?.some((role) => allowedRoles?.includes(role));
    return allowedRoles?.some((allowedRole) => allowedRole === auth?.roles);
  }, [auth, allowedRoles]);

  return isAllowedRole ? (
    <Outlet />
  ) : auth?.accessToken ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
