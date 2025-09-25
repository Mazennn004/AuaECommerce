'use server'

import getMyToken from "@/utilities/GetMyToken"

type Address={
    shippingAddress:{
        details:string,
        phone:string,
        city:string,
    }
}
export async function createOnlineOrder(cartId:string,address:Address,url=process.env.NEXTAUTH_URL){
const accessToken=await getMyToken();
try{
if(accessToken){
    const response=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
        method:'POST',
        headers:{
            token:accessToken.token,
            'Content-Type':'application/json',
        },
        body:JSON.stringify(address),
    });
    if(response.ok){
        const payload=await response.json();
        return payload;
    }else{
        const payload=await response.json();
        throw new Error(`${payload?.message || 'Unexpected error occured, please try again later'}}`);
    }
}else{
    throw new Error('Unauthorized User, pleease login again');
}
}catch(err){
console.error(err)
return `${err || 'Unexpected error occured, please try again later'}`
}
}