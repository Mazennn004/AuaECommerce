import getProducts from "@/endpoints/getAllProducts.api";
import React from "react";
import { Product } from "./../../../interfaces/product.interface";
import { ProductsResponse } from "./../../../interfaces/allproducts.interface";
import  ProductLayout  from '@/app/_components/ProductsLayout/ProductLayout';

export default async function SearchOutput({
  params,
}: {
  params: Promise<{search:string}>;
}) {
  const { search } = await params;
  const products: ProductsResponse = await getProducts(`limit=60`);
  const { data }: { data: Product[] } = products;

  const result = data.filter((p: Product) => {
    return (
      p.slug.includes(`${search}`) ||
      p.title.toLowerCase().includes(`${search}`) ||
      p.brand.slug.includes(`${search}`) ||
      p.category.slug.includes(`${search}`) ||
      p.subcategory[0]?.slug.includes(`${search}`)||
      p.description.toLowerCase().includes(`${search}`)
    );
  });
  return (
    <>
    ,<ProductLayout data={result} products={products}/>
    </>
  );
}
