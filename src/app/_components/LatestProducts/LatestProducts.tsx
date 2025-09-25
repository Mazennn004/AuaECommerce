import { ProductsResponse } from '@/app/interfaces/allproducts.interface';
import getProducts from '@/endpoints/getAllProducts.api'
import React from 'react'
import ProductCard from '../ProductCard/ProductCard';
import { Fade } from 'react-awesome-reveal';

export default async function LatestProducts() {
const products:ProductsResponse=await getProducts(`limit=4&sort=--createdAt`);
const data=products.data;

  return (
    <Fade delay={500} duration={800}>
        <section id='latest' className=' bg-slate-50 p-7'>
      <header className='p-10 font-poppins text-center'>
        <h3 className='text-4xl font-bold'>Fresh off the Line</h3>
        <p className='text-slate-400 text-md'>Discover the latest Additions to the Aura collecation</p>
      </header>
      
      <div className='flex flex-wrap p-5'>
        {
            data.map((p)=>{
                return (<ProductCard key={p._id} product={p}/>)
            })
        }
      </div>
    </section>
    </Fade>
  )
}
