import Image from "next/image";
import Navbar from './_components/Navbar/Navbar';
import Hero from "./_components/Hero/Hero";
import getCategories from "../endpoints/getCategories.api";
import CategoriesSwiper from './_components/CategoriesSwiper/CategoriesSwiper';
import LatestProducts from './_components/LatestProducts/LatestProducts';
import FavouriteProducts from "./_components/FavouriteProducts/FavouriteProducts";
import BrandsTrusted from "./_components/BrandsTrustedSection/BrandsTrusted";
import Subscribe from "./_components/Subscribe/Subscribe";


export default async function Home() {
 const categories=await getCategories();

 
  return (
<>

<Hero/>
<CategoriesSwiper categories={categories}/>
<LatestProducts/>
<FavouriteProducts/>
<BrandsTrusted/>
<Subscribe/>
</>
  );
}
