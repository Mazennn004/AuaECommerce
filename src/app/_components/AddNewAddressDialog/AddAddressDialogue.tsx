'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import React from 'react'
import AddressForm from './../AddressBookForm/AddressForm';
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import addNewAddress from '@/endpoints/Address/addNewAddress.api'
import { toast } from 'sonner'
import { AddressCard } from '@/app/interfaces/address.interface'

export default function AddAddressDialogue({set}:{set:React.Dispatch<React.SetStateAction<AddressCard[] | undefined>>} ) {
const schema=z.object({
    details:z.string('enter valid address *').nonempty('address details is required*'),
    city:z.string().nonempty('city is required *'),
       phone: z.string().nonempty('phone is required *').regex(/^(?:\+20|0)(10|11|12|15)[0-9]{8}$/,'Must be an egyptain number *'),
});
type schemaObj=z.infer<typeof schema>
const{register,handleSubmit,formState}=useForm({
    defaultValues:{
        details:'',
        city:'',
        phone:'',
    },
    resolver:zodResolver(schema),
})
async function handleAddAddress(val:schemaObj){
    
try{
const payload=await addNewAddress(val);

if(payload.status=='success'){
    toast(`Address added successfully`,{position:'top-right',className:'!bg-emerald-400'});
    set(payload.data);
}else{
    throw new Error(`${payload.message}`)
}
}catch(err){
 toast(`${err}`,{position:'top-right', className:'!bg-red-500'})
}
}
  return (
   <Dialog>
  <DialogTrigger className='p-2  cursor-pointer rounded-xl bg-black text-white font-poppins'>  
          <i className='fa-solid fa-plus mx-1'></i>
          <span className='text-sm lg:text-md'>Add New Address</span>
        </DialogTrigger>
  <DialogContent>
    <DialogTitle>Add New address</DialogTitle>
  <form  onSubmit={handleSubmit(handleAddAddress)} className="p-3">
      <label htmlFor="details" className="font-poppins">Address</label>
      <Input id='details' type="text" {...register('details')}  className={`${formState.errors.details  && 'border-red-400'}`} placeholder="Address Details"/>
      {formState.errors.details  && <span className='text-red-500 text-sm mt-2'>{formState.errors.details?.message}</span>}
      <div className="flex w-full">
     <div className="p-2 w-1/2">
         <label htmlFor="city" className="font-poppins">City</label>
      <Input id='city' type="text" {...register('city')} className={`${formState.errors.city  && 'border-red-400'}`} placeholder="City"/>
      {formState.errors.city  && <span className='text-red-500 text-sm mt-2'>{formState.errors.city?.message}</span>}
     </div>
     <div className="p-2  w-1/2">
         <label htmlFor="phone" className="font-poppins">Phone</label>
      <Input id='phone' type="tel" {...register('phone')} className={`${formState.errors.phone && 'border-red-400'}`} placeholder="Phone Number"/>
      {formState.errors.phone  && <span className='text-red-500 text-sm mt-2'>{formState.errors.phone?.message}</span>}
     </div>
      </div>
      <div className='flex justify-end'>
        <Button>Save</Button>
    </div>
    </form>
    
  </DialogContent>
</Dialog>
  )
}
