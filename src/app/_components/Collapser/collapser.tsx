import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Input } from '@/components/ui/input';
import { usePathname } from "next/navigation";
import SearchForm from '../SearchForm/SearchForm';
import { Session } from 'next-auth';

export default function Collapser({session,logout,cartCount}: {session:Session|null, status:string,logout:() => void,cartCount:number | undefined}) {
      const path:string = usePathname();
  return (
    <div className="will-collapse">
       {
        session && <>
        <Link href="/cart" className="lg:hidden relative mx-3">
        <div className="w-4 h-4 rounded-full absolute top-0 end-[-5] bg-main text-white flex justify-center">
         <span className="text-[10px]">{cartCount}</span>
        </div>
          <i className="fa-solid fa-basket-shopping text-xl mt-2 "></i>
        </Link>
        </>
       }

       <Sheet>
        
        <SheetTrigger  className="lg:hidden">
          <i className=" fa-solid fa-bars text-2xl mt-2 cursor pointer"></i>
          
        </SheetTrigger>
        <SheetContent >
          <SheetHeader>
            <SheetTitle>
                 <SearchForm/>
              
              <ul className="flex flex-col gap-3 mt-5  ">
                <li className="capitalize text-lg font-medium text-slate-600">
                  <Link
                  onClick={()=>{}}
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
             {
              session ?(
                <>
                   <li className="capitalize text-lg font-medium text-slate-600">
                  <Link
                    className={`transition-all duration-300 hover:text-main ${
                      path === "/wishlist" ? "text-secondary" : ""
                    }`}
                    href="/wishlist"
                  >
                    Wishlist
                  </Link>
                </li>
                 <li className="capitalize text-lg font-medium text-slate-600">
                  <Link
                    className={`transition-all duration-300 hover:text-main ${
                      path === "/settings" ? "text-secondary" : ""
                    }`}
                    href="/settings"
                  >
                    Settings
                  </Link>
                </li>
               
                 <li className="capitalize text-lg font-medium text-slate-600">
                  <span onClick={logout} className={`transition-all duration-300 hover:text-main`}>
                    Log Out
                  </span>
                </li>

               
                </>
              ):  <li className="capitalize text-lg font-medium text-slate-600">
                  <Link
                    className={`transition-all duration-300 hover:text-main`}
                    href="/login"
                  >
                    Register Now
                  </Link>
                </li>
             }
              </ul>
             
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
     </div>
  )
}
