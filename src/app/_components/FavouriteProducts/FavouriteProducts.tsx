import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { Fade } from 'react-awesome-reveal'
import getProducts from '@/endpoints/getAllProducts.api';
import { ProductsResponse } from '@/app/interfaces/allproducts.interface';

export default async function FavouriteProducts() {
    const products:ProductsResponse=await getProducts(``);
    const data=products.data.filter((p)=>{return p.ratingsQuantity>100});
    
  return (
    <Fade delay={500} duration={800}>
            <section id='favourite' className=' bg-slate-50 p-7'>
          <header className='p-10 font-poppins text-center'>
            <h3 className='lg:text-4xl text-xl font-bold'>Community Favourites</h3>
            <p className='text-slate-400 text-sm lg:text-md'>Tried, Tested and loved, see wht everybody is talking about</p>
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
