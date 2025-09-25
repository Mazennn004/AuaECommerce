'use server'

import getMyToken from "@/utilities/GetMyToken"
type Address={
    shippingAddress:{
        details:string,
        phone:string,
        city:string,
    }
}
export async function createCashOrder(cartId:string,address:Address){
const accessToken=await getMyToken();
try{
    if(accessToken){
        const response=await fetch(`${process.env.API}/orders/${cartId}`,{
            method:'POST',
            headers:{
                token:accessToken.token,
                "Content-Type":"application/json",
            },
            body:JSON.stringify(address)
        });
        if(response.ok){
            const payload=response.json();
            return payload;
        }else{
              const payload=await response.json();
            throw new Error(payload?.message || 'Unexpected error occured, please try again later');
        }
    }else{
        throw new Error('Unauthorized user, please login');
    }
}catch(err){
    console.error(err);
return `${err || 'unexpected error occured please try again later'} `
}
}