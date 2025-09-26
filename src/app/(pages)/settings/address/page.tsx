'use client'
import AddresCard from '@/app/_components/AddressCard/addresCard';
import { AddressCard } from '@/app/interfaces/address.interface';
import getUserAddress from '@/endpoints/Address/getLoggedUserAddress.api';
import React, { useEffect , useState} from 'react'
import { toast } from 'sonner';
import AddAddressDialogue from './../../../_components/AddNewAddressDialog/AddAddressDialogue';

export default function AddressSettings() {
  const[addresses,setAddresses]=useState<AddressCard[]>();
  const[loading,setLoading]=useState<boolean>(true);
    async function handleAddresses() {
      try {
        const payload = await getUserAddress();
        if (payload.status === "success") {
          setLoading(false);
          setAddresses(payload.data);
        }else{
          throw new Error();
        }
      } catch (err) {
              setLoading(false);
        toast(`${err || "error getting user address"}`, {
          position: "top-right",
          className: "!bg-red-400",
        });
      }
    }
  useEffect(()=>{
    handleAddresses();
  },[])


  return (
    <div className='container mx-auto lg:p-3 rounded-xl'>
      <div className='flex justify-between p-2 lg:p-5'>
        <span className='font-bold text-lg'>Addresses</span>
    <AddAddressDialogue set={setAddresses}/>
      </div>
      <div className="flex flex-col gap-3">
        {
          loading && <div className='flex justify-center items-center'><i className='fa-solid fa-spinner fa-spin'></i></div>
        
        }
{addresses?.length===0 ? <span className='font-poppins text-center'>No Addresses</span>:
addresses?.map((addr)=>{
  return <AddresCard key={addr._id} address={addr} array={addresses} set={setAddresses}/>
})
}
      </div>
    </div>
  )
}
