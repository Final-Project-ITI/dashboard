import RestaurantAdmin from "./components/pages/RestaurantAdmin.tsx";
import { Route, Routes } from "react-router-dom";
import MenuTable from "./components/tables/restaurantAdmin/MenuTable.tsx";
import CashierTable from "./components/tables/restaurantAdmin/CashierTable.tsx";
import IngredientsTable from "./components/tables/restaurantAdmin/IngredientsTable.tsx";
import CategoryTable from "./components/tables/restaurantAdmin/CategoryTable.tsx";
import MainAdmin from "./components/pages/MainAdmin.tsx";
import RestaurantCashier from "./components/pages/RestaurantCashier.tsx";
import Login from "./components/pages/Login.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainAdmin />} />
        <Route path="/restaurantAdmin" element={<RestaurantAdmin />}>
          <Route path="menu" element={<MenuTable />} />
          <Route path="cashier" element={<CashierTable />} />
          <Route path="ingredients" element={<IngredientsTable />} />
          <Route path="category" element={<CategoryTable />} />
        </Route>
        <Route path="/restaurantCashier" element={<RestaurantCashier />} />
      </Routes>
    </>
  );
}

export default App;
