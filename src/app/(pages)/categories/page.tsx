import Icategory from '@/app/interfaces/categories.interface';
import getCategories from '@/endpoints/getCategories.api'
import React from 'react'
import CategoryCard from './../../_components/CategoryCard/CategoryCard';

export default async function Categories() {
  const payload:Icategory[]=await getCategories();
  console.log(payload);

  
  return (
    <>
    <header className='font-poppins text-center p-5'>
      <h1 className='font-bold text-4xl'>Categories</h1>
    </header>
    <div className='flex flex-wrap p-4'>
      {
        payload.map((c)=>{
          return <div key={c._id} className='inner p-3'>
            <div className='w-full lg:w-[200px]'>
            <CategoryCard category={c}/></div>
          </div>
        })
      }
   
    </div>
    </>
  )
}
