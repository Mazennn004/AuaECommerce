import ProductLayout from '@/app/_components/ProductsLayout/ProductLayout';
import { ProductsResponse } from '@/app/interfaces/allproducts.interface';
import { Product } from '@/app/interfaces/product.interface';
import getProducts from '@/endpoints/getAllProducts.api';
import React from 'react'

export default async function BrandProducts({params}:{params:Promise<{brand:string}>}) {
    const {brand}=await params;
      const products:ProductsResponse= await getProducts(`brand=${brand}`);
      const { data }:{data:Product[]} = products
return (
    <>
    
      <header className="font-poppins text-center  p-5">
        <h1 className="font-bold text-4xl">{data[0]?.brand.name}</h1>
      </header>

      <ProductLayout data={data} products={products} />
    </>
  );
}
