'use client'
import ProductCard from '@/app/_components/ProductCard/ProductCard';
import { wishlistContext } from '@/app/Context/WishlistContext'
import { Product } from '@/app/interfaces/product.interface';
import { WishlistType } from '@/app/interfaces/wishlist.interface';
import getWishList from '@/endpoints/WishlistActions/getWishlist.api';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function Wishlist() {
  const{count}=useContext(wishlistContext);
  const[items,setItems]=useState<Product[]>([]);
  const[loading,setLoading]=useState(true);


  async function getItemsFromWishlist() {
  
    try{
      const payload:WishlistType=await getWishList();
 
      
      if(payload.status==='success'){
          setLoading(false);
        setItems(payload.data);
      }else{
        throw new Error(`${payload}`)
      }
    }catch(err){
      setLoading(false);
      toast(`${err || 'error fetching data'}`,{position:'top-right',className:'!bg-red-500'});
    }
  }
    useEffect(()=>{
getItemsFromWishlist();
  },[count]);

  if(loading){
    return(  <div className='min-h-screen flex justify-center items-center'>
<div className="loader"></div>
    </div>)
  }
  if(items.length==0){
   return( <div className='flex justify-center h-screen items-center'>
      <span className='text-main text-3xl font-bold'>Wishlist is empty</span>
    </div>)
  }
  return (
    <div className='container mx-auto'>
      <header className='flex justify-between font-poppins p-5 lg:p-7'>
        <h1 className='text-xl lg:text-3xl font-bold '>Wishlist</h1>
        <span className='text-slate-600'>{count} items</span>
      </header>
      <div className='flex flex-wrap p-2'>
{
items.map((p)=>{return  <ProductCard key={p._id} product={p}/>})
}
      </div>
      
    </div>
  )
}
