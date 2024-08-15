import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import { loginInfoSchema } from "@/validator/loginInfoSchema";
import Cookies from "js-cookie";
import useSWRMutation from "swr/mutation";
import handleError from "@/validator/showError";
// import { jwtDecode } from "jwt-decode";
import useFetcherPost from "./useFetcherPost";


type TLoginInfo = {
  username: string;
  password: string;
  role?: string; //FIXME: change this to correct role type
};

interface LoginResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}
//123@Abcd
//username_test
const useLogin = ({ password: pwd, username: user, role }: TLoginInfo) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || `/superuser`;
  const fetcherPost = useFetcherPost();
  const { setAuth } = useAuth();
  const { trigger, isMutating } = useSWRMutation(
    `/v1/oauth/connect/token?username=${user}&password=${pwd}&platform=0`,
    fetcherPost<undefined, LoginResponse>
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      loginInfoSchema.safeParse({ pwd, user, role });
      const response = await trigger();
      console.log({ response });
      // const response = await trigger({
      //   username:"username_test",
      //   password:"123@Abcd",
      //   platform:"0"
      // });
      // if (response) {
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      // const userInfo = jwtDecode<MyJwtPayload>(accessToken);
      // console.log({ accessToken, refreshToken });
      // console.log({ userInfo });
      Cookies.set("refreshToken", refreshToken, {
        path: "/",
        expires: 0.5,
        secure: false, //TODO: Set this to true once the SSL configuration has been successfully completed and verified.
        sameSite: "strict",
      });
      setAuth({
        user,
        // roles: userInfo.roles[0],
        roles: "SUPERUSER",
        accessToken,
        pwd: "",
      });
      navigate(from, { replace: true });
      // }
    } catch (error) {
      handleError(error);
    }
  };

  return { handleSubmit, loading: isMutating };
};

export default useLogin;
