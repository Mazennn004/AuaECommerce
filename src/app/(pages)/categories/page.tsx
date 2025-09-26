import Icategory from "@/app/interfaces/categories.interface";
import getCategories from "@/endpoints/getCategories.api";
import React from "react";
import Image from "next/image";
import CategoryCard from "./../../_components/CategoryCard/CategoryCard";
import Link from "next/link";

export default async function Categories() {
  const payload: Icategory[] = await getCategories();
  return (
    <>
      <header className="font-poppins text-center p-5">
        <h1 className="font-bold text-4xl">Categories</h1>
      </header>
      <div className="flex flex-wrap p-4">
        {payload.map((c) => {
          return (
            <div key={c._id} className="w-full lg:w-1/4 p-3">
              <div className="inner">
                <Link href={`/categories/${c._id}`} >
                    <figure className="rounded-lg lg:h-[400px] h-[100px]">
                      <Image
                        src={c.image}
                        alt="category-image"
                        className="rounded-lg w-full h-full object-cover"
                        width={300}
                        height={100}
                      />
                    </figure>
                    <div className="text-start">
                      <h3 className="text-lg font-medium mt-4">{c.name}</h3>
                    </div>
                  </Link>
               
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
