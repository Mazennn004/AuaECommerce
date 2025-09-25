export default async function getProducts(params=``){
const response=await fetch(`https://ecommerce.routemisr.com/api/v1/products?${params}`);
const data=await response.json();
return data;
}