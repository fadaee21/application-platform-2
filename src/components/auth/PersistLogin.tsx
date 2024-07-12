import { useState, useEffect } from "react";
import useRefreshToken from "@/hooks/context/useRefreshToken";
import { useAuth } from "@/hooks/context/useAuth";
import { Outlet } from "react-router-dom";

const usePersistLogin = () => {
  const { auth, persist } = useAuth();
  const [isLoading, setIsLoading] = useState(!auth?.accessToken && persist);
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      verifyRefreshToken();
    }
  }, [isLoading, refresh]);

  return isLoading;
};

const PersistLogin = () => {
  const isLoading = usePersistLogin();

  if (isLoading) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return <Outlet />;
};

export default PersistLogin;
