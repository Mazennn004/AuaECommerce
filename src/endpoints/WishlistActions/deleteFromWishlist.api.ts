'use server'

import getMyToken from "@/utilities/GetMyToken"

export default async function deleteItemFromWishlist(id:string){

    const accessToken=await getMyToken();
    try{
        if(accessToken){
            const res=await fetch(`${process.env.API}/wishlist/${id}`,{
                method:'DELETE',
                headers:{
                    token:accessToken.token,
                }
            });
            if(res.ok){
                const payload=await res.json();
                return payload;
            }else{
                const payload=await res.json();
                throw new Error(`${payload.message}`);
            }
        }else{
            throw new Error('unauthorized user');
        }
    }catch(err){
        return `${err || 'unexpected error occured, please try again later'}`
    }

}