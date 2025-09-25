'use client'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import {useForm}  from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ResetPassword() {
    const[loading,setLoading]=useState<boolean>()
    const router=useRouter();
    const schema=z.object({
        newPassword:z.string().nonempty('Enter ypur password *').min(6,'password must be atleast 6 chars'),
        rePassword:z.string().nonempty('confirm your password')
    }).refine((obj)=>{
        return obj.newPassword===obj.rePassword
    },{error:'Pasword do not match *',path:['rePassword']});
    const{register,formState,handleSubmit}=useForm<{newPassword:string,rePassword:string}>({
        defaultValues:{
            newPassword:'',
            rePassword:''
        },
        resolver:zodResolver(schema),
    });
    async function confirmChange(vals:{newPassword:string,rePassword:string}) {
        setLoading(true);
        try{
            const res=await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",

                },
                body:JSON.stringify({email:localStorage.getItem('temp')!,newPassword:vals.newPassword})
            });
            if(res.ok){
            const payload=await res.json();
           
            if(payload.token){
                setLoading(false);
                router.push('/login/success');
                localStorage.removeItem('temp');
            }else{
                throw new Error(`${payload.messsage || 'unexpected error occured, please try again later'}`)
            }
        }else{
            const payload=await res.json();
            throw new Error(`${payload.message || 'something went wrong , please try again later'}`)
        }
        }catch(err){
              setLoading(false);
            toast(`${err}`,{position:'top-center',className:'!bg-red-500'})
        }
        
    }
  return (
    <form onSubmit={handleSubmit(confirmChange)} className='min-h-[300px] flex flex-col gap-3 p-5'>
       <header className="font-poppins text-start">
        <h1 className="text-2xl font-bold">Reset your Password</h1>
        <p className="text-slate-400 mt-1 text-md">You will be directed to login page again to sign in with your new password</p>
      </header>
        <div className='flex flex-col gap-1'>
            <label htmlFor="passowrd"> New Password</label>
            <Input type='password' id='password' placeholder='New Password' {...register('newPassword')}/>
         {
        formState.errors.newPassword && <span className="text-red-500">{formState.errors.newPassword.message}</span>
      }
        </div>
         <div className='flex flex-col gap-1'>
            <label htmlFor="rePassword">Confirm Password</label>
            <Input type='password' id='rePassword' placeholder='Confirm password' {...register('rePassword')}/>
                {
        formState.errors.rePassword && <span className="text-red-500">{formState.errors.rePassword.message}</span>
      }
        </div>
      <Button className='cursor-pointer'>{loading ? <i className='fas fa-spinner fa-spin'></i>:'Change Password'}</Button>
    </form>
  )
}
