'use server'

import getMyToken from "@/utilities/GetMyToken"

export default async function getWishList(){
    const accessToken=await getMyToken();
    try{
        if(accessToken){
            const res=await fetch(`${process.env.API}/wishlist`,{
                headers:{
                    token:accessToken.token,
                }
            });
            if(res.ok){
                const payload=await res.json();
                return payload;
            }else{
                const payload=await res.json();
                throw new Error(`${payload.message || 'Unexpected Error occured, please try again later'}`)
            }
        }
    }catch(err){
        return (`${err || 'something went wroing, please try again later'}`)
    }
}