"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Fade, Slide } from "react-awesome-reveal";

export default function ForgetPassword() {
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();
  const schema = z.object({
    email: z
      .email("Please enter valid email")
      .nonempty("Enter your email associated weith your account"),
  });
  const { register, formState, handleSubmit } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  async function sendOTP(vals: { email: string }) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        }
      );

      if (res.ok) {
        const payload = await res.json();
        if (payload.statusMsg === "success") {
          localStorage.setItem("temp", vals.email);
          setLoading(false);
          router.push("/login/otp");
        } else {
          throw new Error(`${payload.message}`);
        }
      } else {
        const payload = await res.json();
        throw new Error(
          `${payload.message || "Something went wrong, please try agian later"}`
        );
      }
    } catch (err) {
      setLoading(false);
      toast(`${err}`, { position: "top-center", className: "!bg-red-500" });
    }
  }
  return (
   
      <form onSubmit={handleSubmit(sendOTP)} className="min-h-[400px]">
        <header className="font-poppins text-start">
          <h1 className="text-2xl font-bold">Enter your email</h1>
          <p className="text-slate-400 mt-1 text-md">
            An OTP Code will be sent directly to your email
          </p>
        </header>
      <Fade duration={500}>
          <div className="flex flex-col gap-2 mt-5">
          <label className="font-poppins font-bold " htmlFor="email">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="Email Addresss"
            id="email"
            {...register("email")}
          />
          {formState.errors.email && (
            <span className="text-red-500">
              {formState.errors.email.message}
            </span>
          )}
          <Button disabled={loading} className="cursor-pointer">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Send OTP"
            )}
          </Button>
        </div>
      </Fade>

        <div className="flex justify-center hover:underline cursor-pointer mt-2 text-main">
          <Link href={"/login"}>Go back to login</Link>
        </div>
      </form>
   
  );
}
