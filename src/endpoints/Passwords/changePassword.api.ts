'use server'

import { changePassword } from "@/app/(pages)/settings/security/page";
import getMyToken from "@/utilities/GetMyToken";

export default async function changeUserPassword(obj:changePassword) {
    const accessToken=await getMyToken();
    try{
            if(accessToken){
        const res=await fetch(`${process.env.API}/users/changeMyPassword`,{
            method:'PUT',
            headers:{
                token:accessToken.token,
                'Content-Type':'application/json',
            },
            body:JSON.stringify(obj),
        });
        const payload=await res.json();
        if(payload.message==='success'){
            
            return payload;
        }else{
            throw new Error(`${payload.message || ' something went wrong, please try again later'}`)
        }
    }else{
        throw new Error(`Unauthorized User`)
    }

    }catch(err){
        console.error(err);
        return `${err || 'unexpected error occured , please try again later'}`;
    }
    
}