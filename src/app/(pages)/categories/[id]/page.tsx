import getProducts from "@/endpoints/getAllProducts.api";
import React from "react";
import ProductLayout from "@/app/_components/ProductsLayout/ProductLayout";
import { ProductsResponse } from "@/app/interfaces/allproducts.interface";
import { Product } from "@/app/interfaces/product.interface";
import  Image  from 'next/image';
import { Fade } from "react-awesome-reveal";


export default async function page({ params }:{params:Promise<{id:string}>}) {
  const { id }: { id: string } = await params;
  const products:ProductsResponse= await getProducts(`category=${id}`);
  const { data }:{data:Product[]} = products;

  return (
    <>
     {data.length!=0 && <header className="font-poppins relative h-[25vh] ">
        <Image src={data[0].category.image} width={200} height={200} alt="category" className="absolute inset-0 -z-20 h-full w-full object-scale-down"/>
    <div className="flex items-center justify-center w-full  absolute inset-0 bg-[rgba(0,0,0,0.6)] z-10">
        <Fade>  <h1 className="font-bold text-4xl text-white">{data[0]?.category?.name}</h1></Fade>
    </div>
      </header>
      }

      <ProductLayout data={data} products={products} />
    </>
  );
}
