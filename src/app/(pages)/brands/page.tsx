import { Brand, BrandsResponse } from '@/app/interfaces/brands.interface';
import getAllBrands from '@/endpoints/getAllBrands.api'
import React from 'react'
import Image  from 'next/image';
import Link from 'next/link';

export default async function Brands() {
  const brands:BrandsResponse=await getAllBrands();
const data:Brand[]=brands.data;
  
  return (
   <>
     <header className='font-poppins text-center p-5'>
      <h1 className='font-bold text-4xl'>Brands</h1>
    </header>
    <div className='flex flex-wrap p-5 '>
      {
        data.map((b)=>{
          return <Link key={b._id} href={`/brands/${b._id}`} className='inner p-4 w-full md:w-1/2 lg:w-1/4 flex justify-center'>
            <Image src={b.image} alt='' width={300} height={300}/>
          </Link>
        })
      }
    </div>

   </>
  )
}
