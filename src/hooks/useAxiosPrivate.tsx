import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { auth }: any = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["jwt"]) {
          config.headers["jwt"] = cookies.token;
        }
        return config;
      },
      (error) => {
        console.log(error?.response?.status);
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403) {
          removeCookie("token", { path: "/" });
          navigate("/login");
        }

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          prevRequest.headers["jwt"] = cookies.token;
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
