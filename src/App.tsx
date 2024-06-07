import RestaurantAdmin from "./components/pages/RestaurantAdmin.tsx";
import { Route, Routes } from "react-router-dom";
import MenuTable from "./components/tables/restaurantAdmin/MenuTable.tsx";
import CashierTable from "./components/tables/restaurantAdmin/CashierTable.tsx";
import IngredientsTable from "./components/tables/restaurantAdmin/IngredientsTable.tsx";
import CategoryTable from "./components/tables/restaurantAdmin/CategoryTable.tsx";
import MainAdmin from "./components/pages/MainAdmin.tsx";
import RestaurantCashier from "./components/pages/RestaurantCashier.tsx";
import Login from "./components/pages/Login.tsx";
import IsAuthGuard from "./guards/IsAuthGuard.tsx";
import IsNotAuthGuard from "./guards/IsNotAuthGuard.tsx";
import useRefreshToken from "./hooks/useRefreshToken.tsx";

function App() {
  const refreshToken = useRefreshToken();

  refreshToken();
  return (
    <>
      <RestaurantCashier />
    </>
    // <>
    //   <Routes>
    //     {/* Auth */}
    //     <Route path="/login" element={<Login />} />
    //     {/* <Route element={<IsNotAuthGuard />}>
    //     </Route> */}

    //     {/* Main Admin */}
    //     <Route element={<IsAuthGuard role="admin" />}>
    //       <Route path="/" element={<MainAdmin />} />
    //     </Route>

    //     {/* Restaurant Admin */}
    //     <Route element={<IsAuthGuard role="restaurantAdmin" />}>
    //       <Route path="/restaurantAdmin" element={<RestaurantAdmin />}>
    //         <Route path="menu" element={<MenuTable />} />
    //         <Route path="cashier" element={<CashierTable />} />
    //         <Route path="ingredients" element={<IngredientsTable />} />
    //         <Route path="category" element={<CategoryTable />} />
    //       </Route>
    //     </Route>

    //     {/* Restaurant Cashier */}
    //     <Route element={<IsAuthGuard role="restaurantCashier" />}>
    //       <Route path="/restaurantCashier" element={<RestaurantCashier />} />
    //     </Route>

    //     {/* <Route path="*" element={<IsAuthGuard role={""} />} /> */}
    //   </Routes>
    // </>
  );
}

export default App;
