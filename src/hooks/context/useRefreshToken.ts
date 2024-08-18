import { useCallback } from "react";
import { useAuth } from "./useAuth";
import Cookies from "js-cookie";
import { axiosInstance } from "@/services/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = useCallback(async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const headersList = {
        "refresh-token": refreshToken,
        Authorization: "Bearer test_access_token", // FIXME: it must be remove
      };

      const reqOptions = {
        url: "/v1/oauth/connect/refresh",
        method: "POST",
        headers: headersList,
      };

      const response: { data: { accessToken: string; refreshToken: string } } =
        await axiosInstance.request(reqOptions);
      const accessToken = response.data.accessToken; // Ensure this matches the response structure
      Cookies.set("refreshToken", response.data.refreshToken, {
        path: "/",
        expires: 0.5,
        secure: false, // Set to true once SSL is configured
        sameSite: "strict",
      });

      setAuth({
        user: "superuser", // This should come from the backend
        pwd: "",
        roles: "SUPERUSER", // Adjust as needed
        accessToken,
      });

      return accessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  }, [setAuth]);

  return refresh;
};

export default useRefreshToken;
