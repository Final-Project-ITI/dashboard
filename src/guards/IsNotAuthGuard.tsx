import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IPayload } from "../models/payload.mode";
import useRefreshToken from "../hooks/useRefreshToken";
import { useEffect } from "react";

const IsNotAuthGuard = () => {
  const refreshToken = useRefreshToken();
  const { auth }: any = useAuth();
  const payload: IPayload | null = auth?.token ? jwtDecode(auth?.token) : null;

  useEffect(() => {
    refreshToken();
  }, []);

  switch (payload?.role.name) {
    case "admin":
      return <Navigate to="/" replace />;
    case "restaurantAdmin":
      return <Navigate to="/restaurantAdmin" replace />;
    case "restaurantCashier":
      return <Navigate to="/restaurantCashier" replace />;
    default:
      return <Outlet />;
  }
};

export default IsNotAuthGuard;
