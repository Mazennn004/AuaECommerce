import React from 'react'
import { Fade } from 'react-awesome-reveal'
import nike from '../../../../public/Nikelogo.png'
import adidas from '../../../../public/adidas.png'
import beko from '../../../../public/beko.png'
import sony from '../../../../public/sony.png'
import  Image  from 'next/image';

export default function BrandsTrusted() {
  return (
    <Fade duration={800} delay={600}>
        <section className='bg-slate-50 p-5'>
      <header className='text-center font-poppins text-2xl'>
        <h4 className='text-slate-500 font-medium'>Trusted by the world most innovative brands</h4>
      </header>
      <div className=' container mx-auto flex flex-wrap mt-4 '>
       {
        [nike,adidas,beko,sony].map((img,i)=>{return  <figure key={i} className='w-full lg:w-[25%] p-7'>
            <Fade direction='down' delay={300*i}>
          <Image src={img} alt='' className='w-full'/>
          </Fade>
        </figure>})
       }
      </div>
    </section>
    </Fade>
  )
}
