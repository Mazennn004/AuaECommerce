'use client'
import { Product } from '@/app/interfaces/product.interface'
import { Input } from '@/components/ui/input'
import getProducts from '@/endpoints/getAllProducts.api'
import { zodResolver } from '@hookform/resolvers/zod'
import {useRouter} from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

export default function SearchForm() {
    const searchSchema=z.object(({
        searchValue:z.string().nonempty(),
    }));
    const form =useForm<{searchValue:string}>({
        defaultValues:{
            searchValue:''
        },
       resolver:zodResolver(searchSchema),
    })
    const router=useRouter();
     const {handleSubmit,register}=form
     function handleSearch(value:{searchValue:string}){
       const actualValue=value.searchValue.toLowerCase();
        form.reset();
        router.push(`/search/${actualValue}`);
    }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="search-input relative">
          <Input
            type="search"
            placeholder="Search..."
            className="rounded-3xl ps-8"
            {...register('searchValue')}
          />
      
          <button
            title="search button"
            type="submit"
            className="absolute start-0 top-[5]"
          >
            <i className="text-slate-400 fa-solid fa-search m-2"></i>
          </button>
        </form>
  )
}
