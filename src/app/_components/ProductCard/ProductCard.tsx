
import Image from 'next/image'
import React from 'react'
import photo from '../../../../public/image.png'
import { Product } from '@/app/interfaces/product.interface'
import AddToCartBn from './../AddToCartBTn/AddToCartBn';
import AddToWhishListBtn from '../AddToWishListBtn/AddToWhishList';
import Link from 'next/link';

export default function ProductCard({product}:{product:Product}) {
  return (
     <div className="p-card w-full  md:w-1/2 lg:w-1/4 p-3">
          <Link href={`/pDetails/${product._id}`} className="inner">
            <figure>
              <Image src={product.imageCover} alt='prodcut-photo' width={400} height={200} className='rounded-lg w-full h-[400px] object-cover'/>
            </figure>
          </Link>
          <div className='labels font-poppins flex justify-between mt-5'>
           <Link href={`/pDetails/${product._id}`} className='flex flex-col'>
             <span className='text-xl font-bold'>{product.title}</span>
             <span className='text-md text-slate-400'>{product.subcategory[0].name}</span>
           </Link>
            <div className='interactions flex gap-3'>
             <AddToCartBn pid={product._id}/>
             <AddToWhishListBtn pid={product._id}/>
            </div>
          </div>
          <div className='price mt-6 flex justify-between'>
            <span className='font-bold text-lg'>{product.price} EGP</span>
        <div>
            <i className='fa-solid fa-star text-yellow-400 mx-1 text-lg'></i>
            <span className='font-poppins'>{product.ratingsAverage}({product.ratingsQuantity})</span>
        </div>
          </div>
          <div>

          </div>

          </div>
  )
}
