'use server'

import getMyToken from "@/utilities/GetMyToken"

export default async function getUserAddress(){
    const accessToken=await getMyToken();
    try{
    if(accessToken){
       const res=await fetch(`${process.env.API}/addresses`,{
            headers:{
                token:accessToken.token,
            }
        });
        const payload=await res.json();
        if(payload.status==='success'){
            return payload;
        }else{
            throw new Error(`${payload.message || 'something went wrong, please try again later'}`)
        }
    }else{
        throw new Error('Not authorized');
    }
    }catch(err){
        return `${err || 'unexpected error occured, please try again later'}`
    }
}