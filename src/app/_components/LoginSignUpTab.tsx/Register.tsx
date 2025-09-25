'use client'
import { AppWindowIcon, CodeIcon } from "lucide-react"
import {signIn} from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from 'next/link';
import SignUpForm from './../SignUpForm/SignUpForm';
import { useState } from "react"
import { useForm } from "react-hook-form"
import { LogInObject, logInSchema } from "@/app/schemas/logInSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { set } from "zod"

export default function Register() {
  const[tab,setTab]=useState('signIn');
  const[loading,setLoading]=useState(false);
  const{register,formState,handleSubmit}= useForm({
    defaultValues:{
      email:'',
      password:'',
    },
    resolver:zodResolver(logInSchema),
  });
  async function handleLogIn(values:LogInObject){
    setLoading(true);
    const response=await signIn('credentials',{
    email:values.email,
    password:values.password,
    redirect:false,
    callbackUrl:'/',
   })
if(response?.ok){
  setLoading(false);
window.location.href='/';
}else{
  setLoading(false);
  toast(`Incorrect email or password`,{position:'top-center',icon:<i className="fa-solid fa-xmark text-red-500 text-lg me-2"></i>,className:'!bg-red-100'});
}
     
  }
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs onValueChange={setTab} value={tab}>
        <TabsList className="w-full">
          <TabsTrigger value="signIn">Sign In</TabsTrigger>
          <TabsTrigger  value="createAccount">Create Account</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
         <form onSubmit={handleSubmit(handleLogIn)}>
           <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Email Address</Label>
                <Input type="email" id="tabs-demo-name" {...register('email')}/>
               { formState.errors.email && <span className="mt-2 text-red-500 text-md">{formState.errors.email.message}</span>}
              </div>
              <div className="grid gap-3">
                <div className="flex justify-between">
            <Label htmlFor="tabs-demo-username">Password</Label>
            <Link href='/login/forgetpassword'>
            <span className="text-main text-sm font-poppins">Forgot Password?</span>
            </Link>    
                </div>
                <Input type="password" id="tabs-demo-username" {...register('password')} />
                  { formState.errors.password && <span className="mt-2 text-red-500 text-md">{formState.errors.password.message}</span>}
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loading} className="w-full cursor-pointer">{loading ? <i className="fa-solid fa-spinner fa-spin text-lg mx-2"></i>: 'Sign In'}</Button>
            </CardFooter>
          </Card>
         </form>
        </TabsContent>
       <SignUpForm to={setTab} loading={loading} setLoading={setLoading}/>
      </Tabs>
    </div>
  )
}
