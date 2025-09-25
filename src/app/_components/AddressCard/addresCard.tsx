
import { AddressCard } from '@/app/interfaces/address.interface';
import getUserAddress from '@/endpoints/Address/getLoggedUserAddress.api';
import removeAddress from '@/endpoints/Address/removeAddress.api';
import React,{useEffect,useState} from 'react'
import { toast } from 'sonner';

export default function AddresCard({address,array,set}:{address:AddressCard,array:AddressCard[],set:React.Dispatch<React.SetStateAction<AddressCard[] | undefined>>}) {
  async function handleRemove(){
    try{
      const payload=await removeAddress(address._id);
      
      if(payload.status='success'){
set(payload.data);
toast('Removed Successfully',{position:'top-right',className:'!bg-emerald-500'})
      }else{
        throw new Error(`${payload}`)
      }
    }catch(err){
toast(`${err || 'Something went wrong'}`,{position:'top-right',className:'!bg-emerald-500'})
    }  }

  return (
      <div className=" address-card flex flex-col border-2 border-slate-200 p-5 rounded-xl">
             
              <div className=" flex justify-between">
                <span className="font-bold text-lg">{address.city}</span>
                <span onClick={()=>{handleRemove()}} className="text-red-500 cursor-pointer">Remove</span>
              </div>
              <span className="text-slate-400">{address.details}.</span>
              <span className="text-slate-400">{address.phone}</span>
            </div>
  )
}
