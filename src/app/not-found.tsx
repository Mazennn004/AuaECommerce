import { Button } from '@/components/ui/button'
import React from 'react'
import  Link  from 'next/link';


export default function notFound() {
  return (
    <div className='h-screen flex justify-center items-center '>
    <div className='text-center font-poppins'>
        <h1 className='text-slate-300 text-[100px] font-extrabold '>404</h1>
        <span className='text-black text-center text-[50px] font-extrabold'>Page Not Found</span>
        <p className='text-slate-400 text-lg'>Sorry, we could not find the page you are looking for, Perhaps you have mistyped the URL or the page has been moved</p>
        <Button className='mt-4 p-5 '>
            <Link href='/'>Go Back Home</Link>
        </Button>
    </div>
    </div>
  )
}
