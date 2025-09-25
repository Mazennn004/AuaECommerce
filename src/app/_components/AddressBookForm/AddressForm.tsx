'use client'
import { AddressBook } from '@/app/schemas/addressForm.schema'
import { Input } from '@/components/ui/input'
import getUserAddress from '@/endpoints/Address/getLoggedUserAddress.api'
import React, { useEffect } from 'react'
import { FormState, UseFormRegister, UseFormSetValue } from 'react-hook-form'

export default function AddressForm({register,formState,setValue}:{register:UseFormRegister<AddressBook>,formState:FormState<AddressBook>,setValue?:UseFormSetValue<AddressBook>}) {


  return (
  <div className="p-3">
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
    </div>
  )
}
