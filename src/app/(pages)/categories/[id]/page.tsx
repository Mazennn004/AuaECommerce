import getProducts from "@/endpoints/getAllProducts.api";
import React from "react";
import ProductLayout from "@/app/_components/ProductsLayout/ProductLayout";
import { ProductsResponse } from "@/app/interfaces/allproducts.interface";
import { Product } from "@/app/interfaces/product.interface";


export default async function page({ params }:{params:Promise<{id:string}>}) {
  const { id }: { id: string } = await params;
  const products:ProductsResponse= await getProducts(`category=${id}`);
  const { data }:{data:Product[]} = products;

  return (
    <>
      <header className="font-poppins text-center  p-5">
        <h1 className="font-bold text-4xl">{data[0]?.category?.name}</h1>
      </header>

      <ProductLayout data={data} products={products} />
    </>
  );
}
