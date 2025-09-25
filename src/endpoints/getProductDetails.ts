
export default async function getProductDetails(pid:string){
    const response=await fetch(`${process.env.API}/products/${pid}`);
    const payload=await response.json();
    return payload;
}