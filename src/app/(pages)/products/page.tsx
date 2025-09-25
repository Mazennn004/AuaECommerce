import React from "react";
import { Separator } from "../../../components/ui/separator";
import Image from "next/image";
import photo from "../../../../public/image.png";
import ProductCard from "./../../_components/ProductCard/ProductCard";
import getProducts from "@/endpoints/getAllProducts.api";
import { Product } from "@/app/interfaces/product.interface";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductLayout from "@/app/_components/ProductsLayout/ProductLayout";
import { ProductsResponse } from "@/app/interfaces/allproducts.interface";

export default async function AllProducts() {
  const products:ProductsResponse = await getProducts();
  const { data } :{data:Product[]}= products;
 
  return (
    <>
      <header className="font-poppins text-center  p-5">
        <h1 className="font-bold text-4xl">Shop All Products</h1>
        <p className="text-slate-400 mt-2">Take a look of all our products</p>
      </header>
     <ProductLayout data={data} products={products}/>
    </>
  );
}
