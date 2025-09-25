"use client";
import React, { createContext, useEffect, useState } from "react";
import { CartProduct, ICart } from "../interfaces/cart.interface";
import getUserCart from "@/endpoints/CartActions/getCart.api";
import getMyToken from "@/utilities/GetMyToken";
export type CartContextType = {
  cartCount?: number;
  setCartCount: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export const cartContext = createContext<CartContextType>({
  cartCount: undefined,
  setCartCount: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState<number>();
  
  async function getCartDetails() {
    try {
      let sum = 0;
      const productsInCart: { pid: string }[] = [];
      const response: ICart = await getUserCart();
      response.data.products.forEach((p) => {
        productsInCart.push({ pid: p.product._id });
        localStorage.setItem("cart", JSON.stringify(productsInCart));
        sum = sum + p.count;
      });
      setCartCount(sum);
    } catch {
      console.warn("User not logged in");
    }
  }
  useEffect(() => {
    getCartDetails();
  }, []);
useEffect(()=>{
     if(cartCount==0){
   localStorage.setItem('cart',JSON.stringify([]));
    }
},[cartCount])

  return (
    <cartContext.Provider value={{ cartCount, setCartCount  }}>
      {children}
    </cartContext.Provider>
  );
}
