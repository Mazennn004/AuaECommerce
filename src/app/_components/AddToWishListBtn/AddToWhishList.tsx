"use client";
import { wishlistContext } from "@/app/Context/WishlistContext";
import addToWishlist from "@/endpoints/WishlistActions/addToWishlist.api";
import deleteItemFromWishlist from "@/endpoints/WishlistActions/deleteFromWishlist.api";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddToWhishListBtn({ pid }: { pid: string }) {
  const { count, setCount } = useContext(wishlistContext);
  const [loading, setLoading] = useState<boolean>();
  const [added, setAdded] = useState<boolean>();
  const router = useRouter();
  async function handleAdd() {
    setLoading(true);
    try {
      const payload = await addToWishlist({ productId: pid });
      if (payload.status === "success") {
        setLoading(false);
        setAdded(true);
        localStorage.setItem("wishlist", JSON.stringify(payload.data));
        setCount(payload.data.length);
        toast("Product Added Successfully to whislist", {
          position: "top-right",
          className: "!bg-emerald-500",
        });
      } else {
        throw new Error(`${payload}`);
      }
    } catch (err) {
      setLoading(false);
      router.push('/login');
      toast(`${err}`, { position: "top-right", className: "!bg-red-500" });
    }
  }
  async function handleDelete() {
    setLoading(true);
    try {
      const payload = await deleteItemFromWishlist(pid);

      if (payload.status === "success") {
        setLoading(false);
        setCount(payload.data.length);
        localStorage.setItem("wishlist", JSON.stringify(payload.data));
        setAdded(false);
        toast(`Product removed from wishlist`, {
          position: "top-right",
          className: "!bg-emerald-500",
        });
      } else {
        console.log(payload);
        throw new Error(`${payload}`);
      }
    } catch (err) {
      setLoading(false);

      toast(`${err}`, { position: "top-right", className: "!bg-red-500" });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("wishlist")) {
      const items: string[] = JSON.parse(localStorage.getItem("wishlist")!);
      items.forEach((item) => {
        if (item === pid) {
          setAdded(true);
        }
      });
    }
  }, [count]);

  if (added) {
    return (
      <button
        onClick={() => {
          handleDelete();
        }}
        title="Remove From Wishlist"
        className="p-2 w-10 h-10 rounded-full border-[1px] border-slate-500 flex cursor-pointer items-center text-white bg-black justify-center hover:bg-white hover:text-black"
      >
        {loading ? (
          <i className="fa-solid fa-spinner fa-spin"></i>
        ) : (
          <i className="fa-solid fa-heart text-lg"></i>
        )}
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        handleAdd();
      }}
      title="AddToWishlist"
      className="p-2 w-10 h-10 rounded-full border-[1px] border-slate-500 flex cursor-pointer items-center justify-center hover:bg-black hover:text-white"
    >
      {loading ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        <i className="fa-solid fa-heart text-lg"></i>
      )}
    </button>
  );
}
