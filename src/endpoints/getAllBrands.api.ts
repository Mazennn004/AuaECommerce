
export default async function getAllBrands(){
    try{
        const res=await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
        const payload=await res.json();
        return payload;
    }catch{
        console.error('error fetchinng data');
    }

}