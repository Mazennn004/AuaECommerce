'use client'
import React, { useState } from "react"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { updateUserObj, updateUserSchema } from "@/app/schemas/updateUser.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import updateUserDetails from "@/endpoints/Profile/updateUserDetials.api";
import { toast } from "sonner";

export default function Settings() {
  const[loading,setLoading]=useState<boolean>(false);
  const {data:session}=useSession();
  const{register,formState,handleSubmit,reset}=useForm<updateUserObj>({
    defaultValues:{
    name:'',
    email: '',
    phone:'',},
    resolver:zodResolver(updateUserSchema)
  });

  async function saveChanges(values:updateUserObj){
    setLoading(true);
try{
   const payload=await updateUserDetails(values);
   if(payload.message==='success'){
    setLoading(false);
    toast(`Details updated successfully`,{position:'top-right',className:'!bg-emerald-500',icon:<i className="fa-solid fa-check me-2"></i>})
    reset();
   }
}catch(err){
  setLoading(false);
toast(`${err || 'Could not update your details, please try again later'}`,{position:'top-right',className:'!bg-red-400',icon:<i className="fa-solid fa-xmark me-2"></i>})
  }
}
   

  

 return (
  <form onSubmit={handleSubmit(saveChanges)} className="container mx-auto p-10 rounded-xl">
    <header className='font-poppins'>
      <h1 className="font-bold text-xl">Profile</h1>
      <span className="text-slate-600">Update your information</span>
    </header>
    <div className="flex flex-col mt-5 gap-5">
       <div>
        <label htmlFor="name" className="font-bold">Full Name</label>
      <Input id="name" {...register('name')} placeholder={`${session?.user.name || ''}`}/>
      {
        formState.errors.name && <span className="text-red-400">{formState.errors.name.message}</span>
      }
       </div>
      <div>
        <label htmlFor="email" className="font-bold">Email</label>
      <Input id="email" {...register('email')} placeholder={`${session?.user.email || ''}`}/>
         {
        formState.errors.email && <span className="text-red-400">{formState.errors.email.message}</span>
      }
      </div>
       <div>
        <label htmlFor="phone"  className="font-bold">Phone Number</label>
      <Input id="phone" type="tel" {...register('phone')} placeholder="Phone Number"/>
          {
        formState.errors.phone && <span className="text-red-400">{formState.errors.phone.message}</span>
      }
      </div>
      <div className="flex justify-end">
        <Button disabled={loading} className="cursor-pointer">{ loading ? <i className="fa-solid fa-spinner fa-spin"></i>: 'Save Changes'}</Button>
      </div>
    </div>
  </form>
 )

}
