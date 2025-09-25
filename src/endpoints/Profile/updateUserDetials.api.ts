'use server'
import { updateUserObj } from "@/app/schemas/updateUser.schema";
import getMyToken from "@/utilities/GetMyToken";

export default async function updateUserDetails(val:updateUserObj){
    const accessToken=await getMyToken();
    try{
        if(accessToken){
        const response=await fetch(`https://ecommerce.routemisr.com/api/v1/users/updateMe`,{
            method:'PUT',
            headers:{
                token:accessToken.token,
                "Content-Type":'application/json',
            },
            body:JSON.stringify(val),
        });
        const payload=await response.json();
       if(payload.message=='success'){
        return payload;
       }else{
        throw new Error(`${payload?.message || 'Something weng wrong, please try again later'}`)
       }
        }else{
           
            throw new Error(`Not authorized User`);
        }
    }catch(err){
        console.error(err)
        return `${err || 'unexpected error occured , try agaan later'}`
    }

}
