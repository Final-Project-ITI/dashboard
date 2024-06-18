import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { IFormInputLogin } from "../../models/formInputs/formInputLogin.model";
import { IPayload } from "../../models/payload.mode";
import { LOGIN_URL } from "../../utils/urls";
import useAuth from "../useAuth";

const useLogin = (): [any, Error] => {
  const { setAuth }: any = useAuth();
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  const [error, setError] = useState<any>();

  const onSubmit = async (loginData: IFormInputLogin) => {
    try {
      const res = await axios.post(LOGIN_URL, loginData);
      const token = await res.data.token;
      const userData: IPayload = jwtDecode(token);
      setAuth({ token });

      setCookie("token", token);

      switch (userData.role.name) {
        case "admin":
          navigate("/", { replace: true });
          break;
        case "restaurantAdmin":
          navigate("/restaurantAdmin", { replace: true });
          break;
        case "restaurantCashier":
          navigate("/restaurantCashier", { replace: true });
          break;
        default:
          throw new Error("unauthorized");
      }
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  return [onSubmit, error];
};

export default useLogin;
