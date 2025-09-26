import Image from 'next/image'
import React from 'react'
import image from '../../../../public/image.png'
import Link from 'next/link'
import Icategory from './../../interfaces/categories.interface';
export default function CategoryCard({category}:{category:Icategory}) {
   
    
  return (
       <div className='category-card'>
         <Link href={`/categories/${category._id}`}className="inner">
               <figure className='rounded-lg lg:h-[400px] h-[100px]'>
                <Image src={category.image} alt='category-image' className='rounded-lg w-full h-full object-cover' width={300} height={100}/>
            </figure>
            <div className='text-start'>
                <h3 className='text-lg font-medium mt-4'>{category.name}</h3>
            </div>
         </Link>
        </div>
  )
}
