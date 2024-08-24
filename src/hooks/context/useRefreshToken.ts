import { useCallback } from "react";
import { useAuth } from "./useAuth";
import Cookies from "js-cookie";
import { axiosInstance } from "@/services/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = useCallback(async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) return Promise.reject(new Error("No refresh token available"));

    const reqOptions = {
      url: "/v1/oauth/connect/refresh",
      method: "POST",
      headers: {
        "refresh-token": refreshToken,
      },
    };

    try {
      const response = await axiosInstance.request<{ accessToken: string; refreshToken: string }>(reqOptions);
      const { accessToken } = response.data;

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
