import ProductLayout from '@/app/_components/ProductsLayout/ProductLayout';
import { ProductsResponse } from '@/app/interfaces/allproducts.interface';
import { Product } from '@/app/interfaces/product.interface';
import getProducts from '@/endpoints/getAllProducts.api';
import Image from 'next/image';
import React from 'react'
import { Fade } from 'react-awesome-reveal';


export default async function BrandProducts({params}:{params:Promise<{brand:string}>}) {
    const {brand}=await params;
      const products:ProductsResponse= await getProducts(`brand=${brand}`);
      const { data }:{data:Product[]} = products
return (
    <>
    { data.length!=0 &&   (  <header className="flex justify-center items-center  p-5">
      <Fade>  <Image src={data[0]?.brand.image} alt={data[0]?.brand.slug} width={200} height={200}/></Fade>
      </header>)
      }

      <ProductLayout data={data} products={products} />
    </>
  );
}
