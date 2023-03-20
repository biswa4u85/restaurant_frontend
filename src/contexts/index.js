import React, { PropsWithChildren, createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthModeContext = createContext(

);

export const AuthModeContextProvider = ({
  children,
}) => {
  const [users, setUsers] = useLocalStorage("users", null);
  const [restaurant, setRestaurant] = useLocalStorage("restaurant", null);
  const [cart, setCart] = useLocalStorage("cart", {});
  const [table, setTable] = useLocalStorage("table", "T1");
  const [deliveryType, setDeliveryType] = useLocalStorage("deliveryType", "Dine-In");
  const [group, setGroup] = useLocalStorage("group", []);
  return (
    <AuthModeContext.Provider
      value={{
        users, setUsers,
        restaurant, setRestaurant,
        table, setTable,
        deliveryType, setDeliveryType,
        group, setGroup,
        cart, setCart
      }}
    >
      <>
        {children}
      </>
    </AuthModeContext.Provider>
  );
};
