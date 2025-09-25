import React from 'react'
import Register from './../../_components/LoginSignUpTab.tsx/Register';
import  Image  from 'next/image';
import aura from '../../../../public/ChatGPT Image Aug 31, 2025, 05_11_14 PM.png'
import imgLoginOne from '../../../../public/LoginImage.webp';
import imgLoginTwo from '../../../../public/loginImage2.webp';
import { getServerSession } from 'next-auth';
import { authOptions } from './../../../auth';
import { redirect } from 'next/navigation';

export default async function RegisterLayout({children}:{children:React.ReactNode}) {
const session=await getServerSession(authOptions);

if(session){
  redirect('/');
}
 
  return (
     <div className='h-screen flex justify-center items-center lg:bg-[rgba(0,0,0,0.5)]'>
      <div className='w-[70%] rounded-xl flex flex-wrap bg-white overflow-x-hidden'>
        <div className='w-full lg:w-1/2 lg:p-5'>
        <div className='py-5 flex items-center'>
            <figure className='w-[50px]'>
                <Image src={aura} alt='aura-logo' className='w-full'/>
            </figure>
            ,<span className='font-poppins font-bold text-2xl mx-0.5'>Aura</span>
        </div>
          <div className='w-full flex justify-center'>
           {children}
          </div>
        </div>
        <div className='hidden  lg:flex lg:w-1/2'>
        <div className='w-full bg-first h-[100%] rounded-r-xl flex items-end p-5'> 
            <div className='font-poppins text-shadow-2xs flex flex-col gap-3'>
                <h1 className='font-bold text-white text-3xl'>Where quality meets design.</h1>
                <span className='text-slate-300 overflow-auto'>Join a community that values craftsmanship and timeless style, Get Started in seconds</span>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}
