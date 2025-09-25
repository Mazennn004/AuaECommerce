"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import logo from "../../../../public/ChatGPT Image Aug 31, 2025, 05_11_14 PM.png";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import Collapser from "../Collapser/collapser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import SearchForm from "../SearchForm/SearchForm";
import { cartContext } from "@/app/Context/CartContext";
import getMyToken from "@/utilities/GetMyToken";
import { ICart } from "@/app/interfaces/cart.interface";
import getUserCart from "@/endpoints/CartActions/getCart.api";
import { wishlistContext } from "@/app/Context/WishlistContext";

export default function Navbar() {
  const path: string = usePathname();
  const { status, data: session } = useSession();
  const { cartCount} = useContext(cartContext);
  const{count}=useContext(wishlistContext);
  function logOut() {
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
    signOut({ callbackUrl: "/login" });
  }


  
  return (
    <nav className="bg-white outline-[1px] outline-slate-100 p-3 w-full flex justify-between fixed top-0 z-50">
      <div className="brand w-[50%] flex justify-between">
        <Link href='/' className="logo-image flex">
          <Image src={logo} width={50} height={50} alt="auro-logo" />
          <span className="mx-1 font-extrabold text-2xl mt-1.5">Aura</span>
        </Link>
        <div className=" hidden lg:block links mt-2">
          <ul className="flex gap-10 text-start">
            <li className="capitalize text-lg font-medium text-slate-600">
              <Link
                className={`transition-all duration-300 hover:text-main ${
                  path === "/" ? "text-secondary" : ""
                }`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="capitalize text-lg font-medium text-slate-600">
              <Link
                className={`transition-all duration-300 hover:text-main ${
                  path === "/products" ? "text-secondary" : ""
                }`}
                href="/products"
              >
                Products
              </Link>
            </li>
            <li className="capitalize text-lg font-medium text-slate-600">
              <Link
                className={`transition-all duration-300 hover:text-main ${
                  path === "/categories" ? "text-secondary" : ""
                }`}
                href="/categories"
              >
                collections
              </Link>
            </li>
            <li className="capitalize text-lg font-medium text-slate-600">
              <Link
                className={`transition-all duration-300 hover:text-main ${
                  path === "/brands" ? "text-secondary" : ""
                }`}
                href="/brands"
              >
                Brands
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:flex right  gap-4">
        <SearchForm />

        {session ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <i className="fa-regular fa-user text-xl !mb-3"></i>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span onClick={logOut} className="cursor-pointer">
                    Log Out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/cart" className=" relative">
              <div className="w-4 h-4 rounded-full absolute top-0 end-[-5] bg-main text-white flex justify-center">
                <span className="text-[10px]">{cartCount}</span>
              </div>
              <i className="fa-solid fa-basket-shopping text-xl mt-2 "></i>
            </Link>
            <Link href="/wishlist" className=" relative">
              <div className="w-4 h-4 rounded-full absolute top-0 end-[-5] bg-main text-white flex justify-center">
                <span className="text-[10px]">{count}</span>
              </div>
              <i className="fa-regular fa-heart text-xl mt-2"></i>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="mt-1">
              <span className="text-main text-md hover:underline">
                Register Now
              </span>
            </Link>
          </>
        )}
      </div>

      <Collapser
        session={session}
        status={status}
        logout={logOut}
        cartCount={cartCount}
      />
    </nav>
  );
}
