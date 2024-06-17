import RestaurantAdmin from "./components/pages/RestaurantAdmin.tsx";
import { Navigate, Route, Routes } from "react-router-dom";
import MenuTable from "./components/tables/restaurantAdmin/MenuTable.tsx";
import CashierTable from "./components/tables/restaurantAdmin/CashierTable.tsx";
import IngredientsTable from "./components/tables/restaurantAdmin/IngredientsTable.tsx";
import CategoryTable from "./components/tables/restaurantAdmin/CategoryTable.tsx";
import MainAdmin from "./components/pages/MainAdmin.tsx";
import RestaurantCashier from "./components/pages/RestaurantCashier.tsx";
import Login from "./components/pages/Login.tsx";
import IsAuthGuard from "./guards/IsAuthGuard.tsx";
import useRefreshToken from "./hooks/useRefreshToken.tsx";
import { createContext, useEffect, useState } from "react";
import IsNotAuthGuard from "./guards/IsNotAuthGuard.tsx";
import { IUser } from "./models/user.model.ts";

export const UserContext = createContext({});

function App() {
  const refreshToken = useRefreshToken();
  const [user, setUser] = useState<IUser>({
    _id: "",
    email: "",
    fullName: "",
    image: "",
  });

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {/* Auth */}
          <Route element={<IsNotAuthGuard />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Main Admin */}
          <Route element={<IsAuthGuard role="admin" />}>
            <Route path="/" element={<MainAdmin />} />
          </Route>

          {/* Restaurant Admin */}
          <Route element={<IsAuthGuard role="restaurantAdmin" />}>
            <Route path="/restaurantAdmin" element={<RestaurantAdmin />}>
              <Route path="menu" element={<MenuTable />} />
              <Route path="cashier" element={<CashierTable />} />
              <Route path="ingredients" element={<IngredientsTable />} />
              <Route path="category" element={<CategoryTable />} />

              {/* Redirection */}

              <Route path="" element={<Navigate to="menu" />} />
              <Route path="*" element={<Navigate to="menu" />} />
            </Route>
          </Route>

          {/* Restaurant Cashier */}
          <Route element={<IsAuthGuard role="restaurantCashier" />}>
            <Route path="/restaurantCashier" element={<RestaurantCashier />} />
          </Route>

          {/* <Route path="*" element={<IsAuthGuard role={""} />} /> */}
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
