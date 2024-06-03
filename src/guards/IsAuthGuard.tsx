import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IPayload } from "../models/payload.mode";

const IsAuthGuard = ({ role }: { role: string | null }) => {
  const { auth }: any = useAuth();
  const payload: IPayload | null = auth?.token ? jwtDecode(auth?.token) : null;

  if (payload?.role.name === role) {
    return <Outlet />;
  }

  console.log("ss");

  switch (payload?.role.name) {
    case "admin":
      return <Navigate to="/" replace />;
    case "restaurantAdmin":
      return <Navigate to="/restaurantAdmin" replace />;
    case "restaurantCashier":
      return <Navigate to="/restaurantCashier" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default IsAuthGuard;
