'use server'
import getMyToken from "@/utilities/GetMyToken";
export default async function deleteProduct(pid:string){
    const accessToken=await getMyToken();
    try{
       if(accessToken){
         const response=await fetch(`${process.env.API}/cart/${pid}`,{
            method:'DELETE',
            headers:{
                token:accessToken.token,
            }
        });
        if(response.ok){
            const payload=await response.json();
            return payload;
        }else{
            throw new Error(`${response.status} something went wrong, please try again later`);
        }
       }else{
        throw new Error('Unauthorized User, please log in ');
       }
    }catch(err){
        console.error(err);
        return `${err || 'Unexpected error occured'}`
    }
}