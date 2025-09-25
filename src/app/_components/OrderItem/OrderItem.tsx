import { Separator } from '@/components/ui/separator'
import image from '../../../../public/image.png'
import Image from 'next/image'
import React from 'react'
import { SingleOrder } from '@/app/interfaces/orders.interface'

export default function OrderItem({oItem}:{oItem:SingleOrder}) {
  return (
    <div className='w-full bg-slate-100 p-4 rounded-lg'>
            <div className='flex flex-wrap'>
                <div className='w-full lg:w-1/2'>
                <div className='flex flex-wrap'>
                    
                      <div className='flex flex-col font-poppins w-1/2 lg:w-[25%] p-4'>
                        <span className='text-sm'>Order Number</span>
                        <span className='text-slate-400'>#AUR-{oItem.id}</span>
                      </div>
                      <div className='flex flex-col  font-poppins w-1/2 lg:w-[25%] p-4'>
                        <span>Date Placed</span>
                        <span className='text-slate-400'>{ oItem.createdAt ? new Date(oItem.createdAt).toLocaleString() : '—'}</span>
                      </div>
                       <div className='flex flex-col font-poppins w-1/2 lg:w-[25%] p-4'>
                        <span>Total Amount</span>
                        <span className='font-bold'>{oItem.totalOrderPrice} EGP</span>
                      </div>
                        <div className='flex flex-col font-poppins w-1/2 lg:w-[25%] p-4'>
                        <span>Status</span>
                        {
                            oItem.isPaid ? <span className='text-emerald-950 bg-emerald-200 p-2 rounded-full text-xs mb-2 w-fit'>Paid</span>:<span className='text-amber-950 bg-amber-200 p-2 rounded-full text-xs mb-2 w-fit'>await payment</span>
                        }
                      </div>
                    
                </div>
                </div>
                <div className='w-full lg:w-1/2 flex justify-center mt-2 lg:justify-end'>
             {
                oItem.paymentMethodType==='card' ?  ( <>
                <i className='fa-solid fa-credit-card text-lg mt-2 mx-3  text-blue-700'></i>
                <span className='font-poppins text-lg'>Card</span>
               </>) : (  <>
                <i className='fa-solid fa-money-bill-1-wave text-lg mt-2 mx-3  text-green-700'></i>
                <span className='font-poppins text-lg'>Cash</span>
               </>)
             }
                </div>
            </div>
            <Separator className='w-full'/>
            <div className='flex p-3 flex-wrap'>
                {
                    oItem.cartItems.map((o,i)=>{
                        return <figure key={i} className='p-3 w-[150px]'>
                            <Image src={o.product.imageCover} alt='order' width={200} height={200} className='rounded-lg w-full h-[150px] object-cover'/>
                        </figure>
                    })
                }
            </div>
        </div>
  )
}
