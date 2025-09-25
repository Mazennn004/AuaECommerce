import React from 'react'

import OrderItem from './../../_components/OrderItem/OrderItem';
import { getMyOrders } from '@/endpoints/getUserOrders';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { Orders } from '@/app/interfaces/orders.interface';


export default async function AllOrders() {
const session=await getServerSession(authOptions);

const payload:Orders=await getMyOrders(session ? session.id :'');

if(payload.length===0){
    return (
        <div className='h-screen flex justify-center items-center font-poppins'>
            <span className='text-main font-bold text-4xl'>No Orders Yet</span>
        </div>
    )
}

  return (
    <>
    <header className='p-7 font-poppins'>
        <h1 className='text-lg lg:text-4xl font-bold'>My Orders</h1>
        <span className='text-slate-400 lg:text-md'>Check the status of your recent orders.</span>
    </header>
    <div className='flex flex-col p-5 gap-7 '>
   {payload.map((o)=>{ return <OrderItem key={o._id} oItem={o}/>})}
    </div>
    </>
  )
}
