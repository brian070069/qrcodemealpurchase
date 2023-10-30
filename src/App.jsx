import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useValidateToken } from "./hooks/useValidateToken";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FallBack from "./components/FallBack";

//pages
const Register = React.lazy(() => import("./Pages/SignUp/Register"));
const Login = React.lazy(() => import("./Pages/SingIn/Login"));
const ForgotPassword = React.lazy(() => import("./pages/resetpassword/Index"));
const Cart = React.lazy(() => import("./Pages/Cart/Cart"));
const MealHistory = React.lazy(() => import("./Pages/Mealhistory/MealHistory"));
const OrderDetails = React.lazy(() =>
  import("./Pages/Mealhistory/OrderedFoodDetails/App")
);
const Profile = React.lazy(() => import("./Pages/Profile/Profile"));
const HomeApp = React.lazy(() => import("./Pages/Home/Home"));
const ChangePassword = React.lazy(() =>
  import("./Pages/Profile/changePassword/ChangePassword")
);
const Scanner = React.lazy(() => import("./Pages/Managment/Staff/Scanner"));
const AddNewItem = React.lazy(() =>
  import("./Pages/Managment/Staff/updateItems/addNewFood/AddNewItem")
);
const Admin = React.lazy(() => import("./Pages/Managment/Admin/Admin"));
const UpdateItems = React.lazy(() =>
  import("./Pages/Managment/Staff/updateItems/updateExistingFood/UpdateItems")
);
const UpdateOneItem = React.lazy(() =>
  import(
    "./Pages/Managment/Staff/updateItems/updateExistingFood/UpdateExistingFood"
  )
);
const Transactions = React.lazy(() =>
  import("./Pages/Managment/CustomerCare/transactions/Transactions")
);

function App() {
  useValidateToken();

  return (
    <Suspense fallback={<FallBack />}>
      <ToastContainer style={{ width: "fit-content" }} />
      <SkeletonTheme baseColor="#192433" highlightColor="#23313d">
        <Routes>
          {/* ...public routes */}
          <Route path="/" element={<HomeApp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* protected routes */}
          <Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/mealhistory">
              <Route index element={<MealHistory />} />
              <Route path=":id" element={<OrderDetails />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/staff">
              <Route index element={<UpdateItems />} />
              <Route path="scanner" element={<Scanner />} />
              <Route path="addnewitem" element={<AddNewItem />} />
              <Route path="item/:id" element={<UpdateOneItem />} />
            </Route>
            <Route path="/admin">
              <Route index element={<Admin />} />
            </Route>
          </Route>

          {/* catch all */}
        </Routes>
      </SkeletonTheme>
    </Suspense>
  );
}

export default App;
