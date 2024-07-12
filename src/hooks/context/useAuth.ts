import AuthContext from "@/context/AuthProvider";
import { useContext, useDebugValue } from "react";
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  useDebugValue(context?.auth, (auth) =>
    auth?.user ? "Logged In" : "Logged Out"
  );
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
