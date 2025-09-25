'use server'

import getMyToken from "@/utilities/GetMyToken"

export default async function updateQuantity(productCartId:string,count:number){
    const accessToken=await getMyToken();
    try{
      if(accessToken){
          const response=await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productCartId}`,{
            method:'PUT',
            headers:{
                token:accessToken.token,
                "Content-Type":"application/json",
            },
            body:JSON.stringify({count:count})
        })
    //   if(response.ok){
        const payload=await response.json();
        return payload;
    //   }else{
    //     throw new Error(`${response.status} something went wrong`);
    //   }
    //   }else{
    //     throw new Error('unauthorized User, please log in');
}//   }
    }catch(err){
console.error(err);
return `${err || 'unexpected error occured '}`;
    }
}