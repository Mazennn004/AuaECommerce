"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import CategoryCard from './../CategoryCard/CategoryCard';
import 'swiper/css';
import {Autoplay} from 'swiper/modules'
import Icategory from './../../interfaces/categories.interface';
import { useSession } from 'next-auth/react';

export default function CategoriesSwiper({categories}:{categories:Icategory[]}) {

    return (
    <section className='bg-white lg:p-[60px]'>
      <header className='p-[50px] flex text-center flex-col font-poppins'>
        <h2 className='font-bold text-4xl'>Shop By Categories</h2>
        <p className='text-slate-500 text-md mt-4'>Curated collections for every aspect of your life</p>
      </header>
   
    <Swiper 
     modules={[Autoplay]}
     autoplay={{
        delay: 1000,   // time in ms between slides
        disableOnInteraction: false, // keep autoplay after interaction
      }}
      spaceBetween={30}
      slidesPerView={4}
    >
      {
        categories.map((cat:Icategory)=>{
          return <SwiperSlide key={cat._id}>
            <CategoryCard category={cat}/>
          </SwiperSlide>
        })
      }
    </Swiper>


    </section>
  )
}
