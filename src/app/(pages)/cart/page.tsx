"use client";
import React, { useContext, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import CartItem from "./../../_components/CartItem/CartItem";
import { Button } from "@/components/ui/button";
import { CartProduct, ICart } from "@/app/interfaces/cart.interface";
import { Product } from "@/app/interfaces/product.interface";
import { cartContext } from "@/app/Context/CartContext";
import getUserCart from "@/endpoints/CartActions/getCart.api";
import Link from "next/link";
import deleteAllCart from "@/endpoints/CartActions/deleteAllCart.api";
import { toast } from "sonner";

export default function Cart() {
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState<CartProduct[]>([]);
  const [cartDetails, setCartDetails] = useState<ICart>();
  const { setCartCount } = useContext(cartContext);
  const[disabled,setDisabled]=useState<boolean>(false)
  async function getCart() {
    setLoading(true);
    try {
      const response: ICart = await getUserCart();
      if (response.status === "success") {
        setLoading(false);
        setItems(response.data.products);
        setCartDetails(response);
      } else {
        setLoading(false);
        console.log("no auth");
      }
    } catch {
      console.error("unexpected error occured");
    }
  }
  async function handleDeleteAll() {
    try {
      const payload: { message: string } = await deleteAllCart();
      if (payload?.message === "success") {
        localStorage.setItem("cart", JSON.stringify([]));
        getCart();
        toast(`All Items Deleted`, {
          position: "top-right",
          className: "!bg-emerald-500",
          icon: <i className="fa-solid fa-check text-md me-2"></i>,
        });
        setCartCount(0);
      } else {
        throw new Error(
          `${
            payload.message || "Something went wrong, please try again later!"
          }`
        );
      }
    } catch (err) {
      console.error(err);
      toast(`${err || "Could not delete items, Unexpected error"}`, {
        position: "top-right",
        className: "!bg-emerald-500",
        icon: <i className="fa-solid fa-check text-md me-2"></i>,
      });
    }
  }
if(cartDetails){
localStorage.setItem('total',`${cartDetails.data.totalCartPrice}`)
}
  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }
  if (items.length == 0) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <div className=" flex flex-col items-center ">
            <i className="fa-solid fa-cart-shopping text-5xl text-main text-center"></i>
            <h1 className="font-poppins text-5xl font-bold">Cart is empty</h1>
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <header className="p-10 font-poppins flex justify-between">
        <h1 className=" text-md md:text-3xl  font-bold">Shopping Cart</h1>
        <span
          onClick={() => {
            handleDeleteAll();
          }}
          className="text-red-400 cursor-pointer"
        >
          Delete All{" "}
          <i className="fa-solid fa-trash-can-arrow-up text-lg text-red-600"></i>
        </span>
      </header>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-[60%] p-5">
          <div className="inner">
            {items.map((c) => {
              return <CartItem key={c._id} item={c} cart={cartDetails} setCart={setCartDetails} setItems={setItems} disabled={disabled} setDisabled={setDisabled}/>;
            })}
          </div>
        </div>
        <div className="w-full lg:w-[30%] p-5">
          <div className="inner">
            <div className="bg-slate-50 rounded p-5">
              <span className="text-md font-semibold">Order Summary</span>
              <Separator className="mt-3 bg-slate-300" />
              <div className="flex justify-between">
                <span className="text-xs mt-5 font-semibold text-slate-500">
                  Subtotal
                </span>
                <span className="text-xs mt-5 font-semibold">
                  {cartDetails?.data.totalCartPrice} EGP
                </span>
              </div>
              <Separator className="mt-3 bg-slate-300" />
              <div className="flex justify-between">
                <span className="text-xs mt-5 font-semibold text-slate-500">
                  Shipping
                </span>
                <span className="text-xs mt-5 font-semibold">15 EGP</span>
              </div>
              <Separator className="mt-5 bg-slate-300" />
              <div className="flex justify-between">
                <span className="text-sm mt-5 font-semibold">Order total</span>
                <span className="text-xs mt-5 font-semibold">
                  { cartDetails ? (cartDetails.data.totalCartPrice! + Number(15)):''} EGP
                </span>
              </div>
              <Button className="mt-4 w-full cursor-pointer">
                <Link href={`/checkout/${cartDetails?.cartId}`}>Proceed to checkout</Link>
              </Button>
              <div className="flex justify-center w-full">
                <Link
                  href="/products"
                  className="mt-5 text-main cursor-pointer text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
