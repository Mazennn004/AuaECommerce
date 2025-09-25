"use client";
import { cartContext } from "@/app/Context/CartContext";
import { ICart } from "@/app/interfaces/cart.interface";
import { Button } from "@/components/ui/button";
import addToCart from "@/endpoints/CartActions/AddtoCart";
import deleteProduct from "@/endpoints/CartActions/deleteProduct.api";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export default function AddToCartDetailsBtn({ pid }: { pid: string }) {
  const { cartCount, setCartCount } = useContext(cartContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>();
  async function handleAddToCart() {
    setLoading(true);
    try {
      const response: ICart = await addToCart(pid);
      if (response.status === "success") {
        setLoading(false);
        toast(`${response.message}`, {
          position: "top-right",
          icon: (
            <i className="fa-solid fa-check !text-green-900 !text-lg me-2"></i>
          ),
          className: "!bg-green-500",
        });
        setCartCount(cartCount! + 1);
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
        setLoading(false);
        toast(`${response.message || "Login in order to add to cart"}`, {
          position: "top-right",
          icon: (
            <i className="fa-solid fa-xmark !text-red-900 !text-lg me-2"></i>
          ),
          className: "!bg-red-500",
        });
      }
    } catch (err) {
      toast(`${err || "unexpected error occured"}`, {
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
          setIsAdded(false);
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
      console.error(err)
   toast(`${err || 'Could not delete product, try again later'}`, {
          position: "top-right",
          icon: (
            <i className="fa-solid fa-xmark !text-green-900 !text-lg me-2"></i>
          ),
          className: "!bg-red-500",
        });
    }
  }
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const items: { pid: string }[] = JSON.parse(
        localStorage.getItem("cart")!
      );
      items.forEach((item) => {
        if (item.pid === pid) {
          setIsAdded(true);
        }
 
      });
    }
  }, [cartCount]);

  if(isAdded){
     return (
    <Button
    disabled={loading}
      onClick={() => {
     handleDelete()
     
      }}
      className="p-5 w-full cursor-pointer !bg-slate-400 hover:!bg-black disabled:cursor-not-allowed hover:!text-white !text-black"
    >
      {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <span className="font-poppins"><i className="text-md fa-solid fa-check mx-2"></i>Added</span>}
    </Button>
  );
  }
  return (
    <Button
    disabled={loading}
      onClick={() => {
        handleAddToCart();
      }}
      className="p-5 w-full cursor-pointer"
    >
      {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add to Bag"}
    </Button>
  );
}
