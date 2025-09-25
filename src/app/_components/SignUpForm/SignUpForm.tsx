import React, { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { signUpSchema, SignUpObject } from "@/app/schemas/signUp.schema";
import { toast } from "sonner";


export default function SignUpForm({to,loading,setLoading}:{to:Dispatch<SetStateAction<string>>,loading:boolean,setLoading:Dispatch<SetStateAction<boolean>>}) { 

  const signup = useForm<SignUpObject>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const { register, formState, handleSubmit } = signup;
  
  

  async function createUserAccount(values: SignUpObject) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        const payload = await response.json();
    if (payload.message === "success") {
      setLoading(false);
     signup.reset();
    to('signIn');
      toast("Account Created Successfully",{position:'top-center',icon:<i className="fa-solid fa-check-circle text-green-500 me-2 text-lg"></i>,className:'!bg-green-100'});
    } else {
      console.error(payload);
      
    throw new Error(`${payload?.message}`)
    }

    } catch (err){
    setLoading(false)
    console.log(err);
    toast(`${err}`,{position:"top-center",icon:<i className="fa-solid fa-xmark text-red-500 text-lg me-2"></i>,});
    }

  
  }
  return (
    <TabsContent value="createAccount">
      <form onSubmit={handleSubmit(createUserAccount)}>
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Enter your details and join us now
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-0.5">
              <Label htmlFor="tabs-demo-current">Name</Label>
              <Input id="tabs-demo-current" type="text" {...register("name")} />
              {formState.errors ? (
                <span className="text-red-500 mt-2">
                  {formState?.errors?.name?.message}
                </span>
              ) : (
                ""
              )}{" "}
            </div>
            <div className="grid gap-0.5">
              <Label htmlFor="tabs-demo-new">Email Address</Label>
              <Input  type="email" {...register("email")} />
              {formState.errors.email ? (
                <span className="mt-2 text-red-500">
                  {formState?.errors?.email?.message}
                </span>
              ) : (
                ""
              )}{" "}
            </div>
            <div className="grid gap-0.5">
              <Label htmlFor="tabs-demo-new">Password</Label>
              <Input
                
                type="password"
                {...register("password")}
              />
              {formState.errors.password ? (
                <span className="mt-2 text-red-500">
                  {formState?.errors?.password?.message}
                </span>
              ) : (
                ""
              )}{" "}
            </div>
            <div className="grid gap-0.5">
              <Label htmlFor="tabs-demo-new">confirm Password</Label>
              <Input
                
                type="password"
                {...register("rePassword")}
              />
              {formState.errors.rePassword ? (
                <span className="mt-2 text-red-500">
                  {formState?.errors?.rePassword?.message}
                </span>
              ) : (
                ""
              )}{" "}
            </div>
            <div className="grid gap-0.5">
              <Label htmlFor="tabs-demo-new">Phone Number</Label>
              <Input  type="tel" {...register("phone")} />
              {formState.errors.phone ? (
                <span className="mt-2 text-red-500">
                  {formState?.errors?.phone?.message}
                </span>
              ) : (
                ""
              )}{" "}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading} className="w-full cursor-pointer">
              {loading ? <i className="fa-solid fa-spinner fa-spin text-lg mx-2"></i> : 'Register'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </TabsContent>
  );
}
