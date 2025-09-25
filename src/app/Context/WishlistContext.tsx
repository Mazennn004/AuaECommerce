'use client'
import getWishList from '@/endpoints/WishlistActions/getWishlist.api';
import React, { createContext, useEffect, useState } from 'react'
import { Product } from '../interfaces/product.interface';
import { WishlistType } from '../interfaces/wishlist.interface';
export type WishlistContextType = {
  count?: number;
  setCount: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export const wishlistContext= createContext<WishlistContextType>({
count:undefined,
setCount:()=>{},

});
export default function WishlistContextProvider({children}:{children:React.ReactNode}) {
    const[count,setCount]=useState<number>();
    // const[wishlist,setWishlist]=useState<string[]>();

    async function getWishlist() {
        try{
        const payload:WishlistType=await getWishList();
        if(payload.status==='success'){
            setCount(payload.data.length);
            const wItems=payload.data.map((p)=>{
                return p._id
            });
            localStorage.setItem('wishlist',JSON.stringify(wItems));
        }
        
        }catch(err){
            console.warn(`${err}`);
            console.warn('User Not logged in');
        }
    }

    useEffect(()=>{
        getWishlist();
    },[]);
    useEffect(()=>{
         if(count==0){
       localStorage.setItem('wishlist',JSON.stringify([]));
        }
    },[count])
 
  return (
    <wishlistContext.Provider value={{count,setCount}}>
      {children}
    </wishlistContext.Provider>
  )
}
