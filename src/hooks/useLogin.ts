import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import { loginInfoSchema } from "@/validator/loginInfoSchema";
import Cookies from "js-cookie";
import useSWRMutation from "swr/mutation";
import handleError from "@/validator/showError";
import { jwtDecode } from "jwt-decode";
import useFetcherPost from "./useFetcherPost";

// import { fetcherPost } from "@/services/axios";

type TLoginInfo = {
  username: string;
  password: string;
  role?: string; //FIXME: change this to correct role type
};

interface LoginResponse {
  is_successful: boolean;
  body: {
    access_token: string;
    refresh_token: string;
  };
}

const useLogin = ({ password: pwd, username: user, role }: TLoginInfo) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || `/superuser`;
  const fetcherPost = useFetcherPost();
  const { setAuth } = useAuth();
  const { trigger, isMutating } = useSWRMutation(
    "/panel/login",
    fetcherPost<TLoginInfo, LoginResponse>
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      loginInfoSchema.safeParse({ pwd, user, role });
      const response = await trigger({
        password: pwd,
        username: user,
        role,
      });
      // const response = await trigger({
      //   username:"username_test",
      //   password:"123@Abcd",
      //   platform:"0"
      // });
      if (response.is_successful) {
        const accessToken = response.body.access_token;
        const refreshToken = response.body.refresh_token;
        const userInfo = jwtDecode<MyJwtPayload>(accessToken);
        // console.log({ accessToken, refreshToken });
        console.log({ userInfo });
        Cookies.set("refreshToken", refreshToken, {
          path: "/",
          expires: 0.5,
          secure: false, //TODO: Set this to true once the SSL configuration has been successfully completed and verified.
          sameSite: "strict",
        });
        setAuth({
          user,
          roles: userInfo.roles[0],
          accessToken,
          pwd: "",
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      handleError(error);
    }
  };

  return { handleSubmit, loading: isMutating };
};

export default useLogin;
