import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Product } from '@/app/interfaces/product.interface';
import { Separator } from '@radix-ui/react-separator';
import ProductCard from '@/app/_components/ProductCard/ProductCard';
import { ProductsResponse } from '@/app/interfaces/allproducts.interface';

export default function ProductLayout({products,data}:{products:ProductsResponse,data:Product[]}) {
    const pageCount = new Array(products.metadata.numberOfPages).fill('');
     if(data.length===0){
    return(
      <div className='h-screen flex justify-center items-center'>
      <div className='font-poppins text-center'>
        <h1 className='font-bold text-[50px]'>No Products Found</h1>
        <span className='text-slate-400'>There is no proudct found in this page, maybe you mistyped the product name, or products are out of stock,</span>
      </div>
      </div>
    )
  }
  return (
     <div className="container mx-auto p-5">
           <div className="p-3">
             <span className="font-poppins text-slate-500">
               Showing {data.length} of {products.results} results
             </span>
           </div>
           <Separator />
           <div className="flex flex-wrap mt-5">
             {data.map((p: Product) => {
               return <ProductCard key={p._id} product={p} />;
             })}
   
             <Pagination>
               <PaginationContent>
                 {products.metadata.prevPage && (
                   <PaginationItem>
                     <PaginationPrevious
                       href={`/products/${products.metadata.prevPage}`}
                     />
                   </PaginationItem>
                 )}
                 { pageCount.length>2 ? pageCount.map((p, i) => {
                 
                   
                   return (
                     <PaginationItem key={i}>
                       <PaginationLink href={`/products/${i+1}`}>
                         {i+1}
                       </PaginationLink>
                     </PaginationItem>
                   );
                 }):''}
                 {products.metadata.nextPage && (
                   <PaginationItem>
                     <PaginationNext
                       href={`/products/${products.metadata.nextPage}`}
                     />
                   </PaginationItem>
                 )}
               </PaginationContent>
             </Pagination>
           </div>
         </div>
  )
}
