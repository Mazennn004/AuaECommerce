'use server'

import getMyToken from "@/utilities/GetMyToken"

export default async function removeAddress(id:string){
const accessToken=await getMyToken();
try{
if(accessToken){
    const res=await fetch(`${process.env.API}/addresses/${id}`,{
        method:'DELETE',
        headers:{
            token:accessToken.token,
        }
    });
    const payload=await res.json();
    if(payload.status===`success`){
        return payload;
    }else{
        throw new Error(`${payload.message || 'unexpected error occured, please try again later'}`);
    }
}else{
    throw new Error('unauthorized user');
}
}catch(err){
return `${err || 'something went wrong, please try again later'}`
}
}