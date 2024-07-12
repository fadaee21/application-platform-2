import alertErr from "@/validator/showError";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import { loginInfoSchema } from "@/validator/loginInfoSchema";
import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { getRole } from "@/helper/getRole";
import { axiosInstance } from "@/services/axios";
import axios from "axios";

type TLoginInfo = {
  username: string;
  password: string;
};
const useLogin = ({ password: pwd, username: user }: TLoginInfo) => {
  const [errRes, setErrRes] = useState<string[]>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || `/superuser`;
  const { setAuth } = useAuth();
  useEffect(() => {
    setErrRes([]);
  }, [pwd, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      loginInfoSchema.safeParse({ pwd, user });
      const response = await axiosInstance.post("/panel/login", {
        password: pwd,
        username: user,
      });
      // console.log(response);
      if (response.status === 200) {
        const accessToken = response.data.body.access_token;
        const refreshToken = response.data.body.refresh_token;
        const userInfo = jwtDecode<MyJwtPayload>(accessToken);
        Cookies.set("refreshToken", refreshToken, {
          path: "/",
          expires: 0.5,
          secure: false, //TODO: Set this to true once the SSL configuration has been successfully completed and verified.
          sameSite: "strict",
        });
        console.log({ userInfo });
        const roles = getRole(userInfo.roles);
        setAuth({
          accessToken,
          roles,
          user, //TODO: it must comes from backend not from login
          pwd,
        });
        navigate(from, { replace: true });
      }
      console.log(response.status);

      setErrRes([]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { code, message } = error.response?.data.body || {};
        if (code === "3000") {
          setErrRes(["پسورد و یا رمز عبور اشتباه است"]);
        } else {
          setErrRes([message]);
        }
      } else {
        const err = alertErr(error);
        setErrRes(err); //TODO: i need the helper function to handle errors from server as its schema, no just show error from ZOD validation and wrong password
        setTimeout(() => setErrRes([]), 6000);
      }
    } finally {
      setLoading(false);
    }
  };

  return { errRes, handleSubmit, loading };
};

export default useLogin;
