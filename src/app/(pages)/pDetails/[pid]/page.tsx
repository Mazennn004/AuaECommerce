import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import getProductDetails from "@/endpoints/getProductDetails";
import { Product } from "@/app/interfaces/product.interface";
import Link from "next/link";
import Image from "next/image";
import AddToCartDetailsBtn from './../../../_components/AddToCartDetailsBtn/AddToCartDetailsBtn';
import AddToWhishListBtn from './../../../_components/AddToWishListBtn/AddToWhishList';
import { AccordionDetails } from './../../../_components/Accordion/AccordionDetials';
import RelatedProducts from "@/app/_components/RelatedProducts/RelatedProducts";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ pid: string }>;
}) {
  const { pid } = await params;
  const { data: p }: { data: Product } = await getProductDetails(`${pid}`);

  return (
    <>
      <div className="w-full p-5">
      <div className="p-5 w-full">
        <Breadcrumb>
          <BreadcrumbList className="text-lg">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={"/"}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/categories/${p.category._id}`}>
                  {p.category.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{p.subcategory[0].name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-wrap">
        <div className="product-images w-full lg:w-1/2">
          <figure className=" p-5">
            <Image
              src={p.imageCover}
              alt={p.slug}
              className="h-[600px] object-cover w-full rounded-lg"
              width={300}
              height={500}
            />
          </figure>
          <div className="flex flex-wrap w-full gap-y-1 p-5">
            {p.images.map((i, index) => {
              return (
                <figure key={index} className="w-1/4">
                  <Image
                    src={i}
                    alt="p-images"
                    width={100}
                    height={100}
                    className=" h-[100px] object-cover"
                  />
                </figure>
              );
            })}
          </div>
        </div>
        <div className="actions w-full lg:w-1/2 p-5">
          <header className="flex flex-col gap-2">
            <h1 className="font-poppins text-3xl font-bold">{p.title}</h1>
          </header>
          <div className="flex gap-3 mt-2">
             <ul className='flex gap-0.5'>
                {[1,2,3,4,5].map((star,i)=>{return <li key={i}> <i className={`fa-${p.ratingsAverage>=star ? 'solid':'regular text-slate-300'} fa-star text-md ${p.ratingsAverage>=star ? 'text-yellow-300':''}`}></i></li>})}
            </ul>
            <span className="text-main">{p.ratingsQuantity} Reviews</span>
          </div>
          <div className="mt-10 accordion">
            <AccordionDetails desc={p.description}/>
          </div>
           <div className="buttons flex mt-10 gap-2  justify-center">
            <AddToCartDetailsBtn pid={pid}/>
            <AddToWhishListBtn pid={pid}/>
          </div>
        </div>
      </div>
    </div>
 
 <div className="w-full mt-10">
    <header className="font-poppins font-bold text-2xl">
        <h2 className='ps-3'>You might also like</h2>
    </header>
    <RelatedProducts cid={p.category._id}/>
 </div>
    </>
  
    
  );
}
