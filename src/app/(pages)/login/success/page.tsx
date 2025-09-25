import React from 'react'
import { Fade, Slide } from 'react-awesome-reveal'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Success() {
  return (
 <Slide direction='left'>
<div className='min-h-[350px] flex flex-col p-4 justify-center items-center'>
<div className='flex flex-col items-center'>
   <Fade delay={500} direction='up'> <i className='fa-solid fa-check text-4xl text-emerald-500 text-center mb-5'></i></Fade>
    <Fade delay={250}><span className='font-poppins text-xl font-medium'>All Set, Password reset successfully</span></Fade>
</div>
<Button className='mt-5'><Link href={'/login'}> Back to Login</Link></Button>
</div>

 </Slide>
  )
}
