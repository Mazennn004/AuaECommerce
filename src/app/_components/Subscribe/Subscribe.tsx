import React from "react";
import { Fade } from "react-awesome-reveal";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Subscribe() {
  return (
   <Fade direction={'up'}>
     <section className="p-10 flex justify-center items-center w-full">
      <div className="lg:w-[70%] bg-[linear-gradient(90deg,#1a103d_0%,#3b1a5c_50%,#24184a_100%)] p-16 rounded-xl flex justify-center items-center">
        <div className="text-white font-poppins text-center">
            <h6 className="text-3xl font-medium ">Join Our inner Circle</h6>
            <p className="text-slate-500 mt-2 lg:text-md text-sm">Get exclusive access to New Arrivals, Special Offers, Be the first one to know</p>
            <div className="flex flex-wrap mt-5 lg:justify-between">
                <Input type="text" placeholder="Enter your Email" className="w-full lg:w-[75%]" />
                <Button className="!bg-white w-full my-2 lg:my-0 mx-1 lg:w-[20%] text-black">Subscribe</Button>
            </div>
        </div>
      </div>
    </section>

   </Fade>
  );
}
