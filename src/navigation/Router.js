import React, { useEffect, useContext } from "react";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layouts from "../pages/Layouts";
import { Splash, Login,SignUp, Verificaiton, Home, Profile, Dinein, Table, Details, Cart, OrderSummary, PaymentSuccess } from "../pages";
import { AuthModeContext } from "../contexts";

function Routers() {
  const { users } = useContext(AuthModeContext);
  useEffect(() => {
    if (window?.frappe?.csrf_token == 'None') {
      window.location.replace(`${window.location.origin}/login`)
    }
  }, [])

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verificaiton" element={<Verificaiton />} />
        <Route element={<Layouts />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dinein" element={<Dinein />} />
          <Route path="/table" element={<Table />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default Routers