import React from "react";
import ProductLayout from "../ProductsLayout/ProductLayout";
import getProducts from "@/endpoints/getAllProducts.api";
import { Product } from "@/app/interfaces/product.interface";
import ProductCard from "../ProductCard/ProductCard";
import { Separator } from "@/components/ui/separator";

export default async function RelatedProducts({ cid }: { cid: string }) {
  const products = await getProducts(`limit=4&category=${cid}`);
  const { data } = products;

  return (
    <>
      <div className=" p-5">
        <div className="p-3"></div>
        <Separator />
        <div className="flex flex-wrap mt-5">
          {data.map((p: Product) => {
            return <ProductCard key={p._id} product={p} />;
          })}
        </div>
      </div>
    </>
  );
}
