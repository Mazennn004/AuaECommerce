import React from "react";
import{Fade} from "../../../../node_modules/react-awesome-reveal"
import  Image  from 'next/image';
import hero from '../../../../public/image.png'

export default function Hero() {
  return (
  <>
    <header className=" hidden lg:flex flex-wrap ">
      
      <div className=" w-1/2  bg-slate-50">
        <div className=" heading text-start  mt-[100px] ps-5">
          <h1 className="text-[70px] font-bold">
             Timeless Style,
           
            <Fade triggerOnce={true} duration={2000}>
                <span className="text-main mt-0 font-poppins">Modern Edge.</span>
            </Fade>
          </h1>
         <Fade triggerOnce={true} direction="left" duration={2000}>
             <p className="text-slate-400 text-lg font-medium w-[80%] font-poppins">
            Discover our new collection, crafted for the conscious individual,
            Premium quality, sustainable materials, and designs that last.
          </p>
         </Fade>
     <Fade triggerOnce={true} delay={1000}>
          <div className="flex flex-wrap gap-4 mt-5 font-poppins">
        <button className="p-3 shadow bg-black text-white font-medium rounded-4xl w-[30%] cursor-pointer  hover:bg-slate-200 hover:text-black transition-all duration-300">
            <a href="#latest">Shop new Collections</a>
        </button>
         <button className="p-3 shadow bg-slate-200 text-black rounded-4xl w-[30%] font-medium cursor-pointer  hover:bg-black  transition-all duration-300 hover:text-slate-200">
       <a href="#favourite">Explore Bestsellers</a>
        </button>
       </div>
     </Fade>
        </div>

      </div>
   <div className="w-1/2">
    <Image src={hero} alt="hero-image" className="w-full"/>
   </div>
    </header>
    

    {/*Mobile screen*/}
   <header className="lg:hidden min-h-screen flex justify-center flex-col bg-img ">
    <div className=" heading text-center  mt-[100px]">
          <h1 className="lg:text-[60px] text-5xl font-bold  ">
             Timeless Style,
            
            <Fade duration={2000}>
                <span className="text-main font-poppins">Modern Edge.</span>
            </Fade>
          </h1>
         <Fade direction="left" duration={2000}>
             <p className="text-slate-400 font-poppins">
            Discover our new collection, crafted for the conscious individual,
            Premium quality, sustainable materials, and designs that last.
          </p>
         </Fade>
     <Fade delay={1000}>
          <div className="flex flex-col items-center gap-4 mt-5 font-poppins">
        <button  className="p-5 shadow bg-black text-white font-medium rounded-3xl w-[80%]  ">
            <a href="#latest">Shop new Collections</a>
        </button>
         <button className="p-5 shadow bg-slate-200 text-black rounded-3xl w-[80%] font-medium">
      <a href="#favourite">Explore Bestsellers</a>
        </button>
       </div>
     </Fade>
        </div>
   </header>
    </>
  );
}
