"use client";
import { cartContext } from "@/app/Context/CartContext";
import { CartProduct, ICart } from "@/app/interfaces/cart.interface";
import addToCart from "@/endpoints/CartActions/AddtoCart";
import deleteProduct from "@/endpoints/CartActions/deleteProduct.api";
import getMyToken from "@/utilities/GetMyToken";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddToCartBn({ pid }: { pid: string }) {
  const router=useRouter();
  const[loading,setLoading]=useState<boolean>(false);
  const[isAdded,setisAdded]=useState<boolean>(false);
  const {
 cartCount,
    setCartCount,
  } = useContext(cartContext);
  async function handleAddToCart() {
    setLoading(true);
    try{
      const response: ICart = await addToCart(pid);
    if (response.status === "success") {
      setLoading(false)
      toast(`${response.message}`, {
        position: "top-right",
        icon: (
          <i className="fa-solid fa-check !text-green-900 !text-lg me-2"></i>
        ),
        className: "!bg-green-500",
      });
      setCartCount(cartCount!+1);
      if(localStorage.getItem('cart')){
        const updatedItems:{pid:string}[]=JSON.parse(localStorage.getItem('cart')!)
      updatedItems.push({pid:pid});
      localStorage.setItem('cart', JSON.stringify(updatedItems))
      }else{
        localStorage.setItem('cart',JSON.stringify([]));
        const updatedItems:{pid:string}[]=JSON.parse(localStorage.getItem('cart')!)
      updatedItems.push({pid:pid});
      localStorage.setItem('cart', JSON.stringify(updatedItems));
          }
    } else {
      setLoading(false)
      router.push(`/login`);
      toast(`${response || "Login in order to add to cart"}`, {
        position: "top-right",
        icon: <i className="fa-solid fa-xmark !text-red-900 !text-lg me-2"></i>,
        className: "!bg-red-500",
      });
    }
    }catch(err){
      console.error(err);
      toast(`${"Unexpected error occured"}`, {
        position: "top-right",
        icon: <i className="fa-solid fa-xmark !text-red-900 !text-lg me-2"></i>,
        className: "!bg-red-500",
      });
    }
  }
    async function handleDelete(){
     setLoading(true); 
     try{
         const payload:ICart=await deleteProduct(pid);
         if(payload.status==='success'){
           setLoading(false);
           const updated=payload.data.products.map((p)=>{return {pid:p.product._id}})
            localStorage.setItem('cart',JSON.stringify(updated));
            setisAdded(false);
              setCartCount(cartCount!-1);
             toast(`Product Deleted successfully`, {
            position: "top-right",
            icon: (
              <i className="fa-solid fa-check !text-green-900 !text-lg me-2"></i>
            ),
            className: "!bg-green-500",
          });
         }else{
          throw new Error(payload.message)
         }
      }catch(err){
        console.error(err);
     toast(`${err || 'Could not delete product, try again later'}`, {
            position: "top-right",
            icon: (
              <i className="fa-solid fa-xmark !text-green-900 !text-lg me-2"></i>
            ),
            className: "!bg-red-500",
          });
      }
    }

useEffect(()=>{
if(localStorage.getItem('cart')){
const items:{pid:string}[]=JSON.parse(localStorage.getItem('cart')!);
 
items.forEach((item)=>{
  if(item.pid===pid){
    setisAdded(true);
  }
})
}
},[cartCount])
if(isAdded){
  return (
    <>
       <button
    disabled={loading}
      onClick={() => {
      handleDelete();
      
      }}
      title="delete"
      className="p-2 w-10 h-10 rounded-full border-[1px] disabled:cursor-not-allowed  border-slate-500 flex cursor-pointer items-center justify-center bg-black text-white hover:bg-white hover:text-black"
    >
     {loading ?   <i className="fa-solid fa-spinner fa-spin text-lg"></i>:<i className="fa-solid fa-check text-lg"></i>}
    </button>
    </>
  )
}

  return (
    <button
    disabled={loading}
      onClick={() => {
        handleAddToCart();
      }}
      title="AddToCart"
      className="p-2 w-10 h-10 rounded-full border-[1px] disabled:cursor-not-allowed  border-slate-500 flex cursor-pointer items-center justify-center hover:bg-black hover:text-white"
    >
     {loading ?   <i className="fa-solid fa-spinner fa-spin text-lg"></i>:<i className="fa-solid fa-cart-plus text-lg"></i>}
    </button>
  );
}
