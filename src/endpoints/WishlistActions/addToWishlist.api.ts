'use server'

import getMyToken from "@/utilities/GetMyToken";

export default async function addToWishlist(obj:{productId:string}){
const accessToken=await getMyToken();
try{
if(accessToken){
   const res= await fetch(`${process.env.API}/wishlist`,{
    method:'POST',
        headers:{
            token:accessToken.token,
            "Content-Type":"application/json",
        },
        body:JSON.stringify(obj),
    });
  if(res.ok){
    const payload=await res.json();
    return payload;
  }else{
    const payload=await res.json();
    throw new Error(`${payload.message || 'Unexpected error occured please try again later'}`)
  }
}else{
    throw new Error('Not authorized User');
}
}catch(err){
return `${err || 'Unexpected error occured, please try again later'}`
}
}