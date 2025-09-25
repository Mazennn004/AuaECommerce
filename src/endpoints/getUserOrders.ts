'use server'
export async function getMyOrders(userId:string){

    try{
        const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
        if(res.ok){
            const payload=await res.json();
            return payload;
        }else{
              const payload=await res.json();
            throw new Error(payload.message || 'Unexpected error occured');
        }
    }catch(err){
        console.error(err || 'Unexpected error occured, please try again later');
        return `${err || 'Unexpected error occured, please try again later'}`
    }
}