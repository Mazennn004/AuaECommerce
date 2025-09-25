'use client'
import React, { useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useForm ,Controller} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Slide } from 'react-awesome-reveal'

export default function OTP() {
    const router=useRouter();
    const[loading,setLoading]=useState<boolean>();
    const schema=z.object({
        resetCode:z.string().nonempty('OTP is required')
    })
    const{formState,handleSubmit,control}=useForm<{resetCode:string}>({
        defaultValues:{
            resetCode:''
        },
        resolver:zodResolver(schema),
    });
  async function resetPassword(vals:{resetCode:string}){
    setLoading(true);
try{
const res=await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
    method:'POST',
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify({resetCode:vals.resetCode.trimEnd()}),
});
if(res.ok){
    const payload=await res.json();
    if(payload.status==='Success'){
        setLoading(false);
        router.push('/login/reset');
    }else{
        console.log(payload);
        
        throw new Error(`${payload.message || 'unexpected error occured, please try again later'}`)
    }
}else{
     const payload=await res.json();
    throw new Error(`${payload.message || 'Something went wrong, please try again later'}`)
}
}catch(err){
     setLoading(false);
toast(`${err}`,{position:'top-center',className:'!bg-red-500'})
}
  }  
    return (
    <Slide direction='left'>
        <form onSubmit={handleSubmit(resetPassword)} className='flex flex-col gap-4 min-h-[300px] items-center justify-start'>
   <div className='flex flex-col gap-4'>
     <header className="font-poppins text-center">
        <h1 className="text-2xl font-bold">Reset OTP Code</h1>
        <p className="text-slate-400 mt-1 text-md">An OTP Code has been sent directly to your email</p>
      </header>
    <div className='w-full flex justify-center'>
    <Controller
            control={control}
            name="resetCode"
            render={({ field }) => (
              <InputOTP value={field.value} onChange={(v: string) => field.onChange(v)} maxLength={6}>
                <InputOTPGroup >
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
 
    </div>
     {
        formState.errors.resetCode && <span className="text-red-500  text-center">{formState.errors.resetCode.message}</span>
      }
   </div>
   <Button disabled={loading} className='w-full cursor-pointer'>{loading ? <i className='fa-solid fa-spinner fa-spin'></i>: 'Confirm'}</Button>
   <div className="flex justify-center hover:underline cursor-pointer mt-2 text-main"><Link href={'/login'}>Go back to login</Link></div>
    </form>
    </Slide>
  )
}
