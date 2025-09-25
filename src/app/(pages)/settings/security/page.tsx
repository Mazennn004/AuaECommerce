"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import changeUserPassword from "@/endpoints/Passwords/changePassword.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
export type changePassword = {
  currentPassword: string;
  password: string;
  rePassword: string;
};
export default function Password() {
  const [loading, setLoading] = useState<boolean>();
  const { data: session } = useSession();
  const schema = z
    .object({
      currentPassword: z
        .string("Enter valid password")
        .min(6, "Password at least 6 chars")
        .nonempty("current password is required"),
      password: z
        .string("enter valid password")
        .min(6, "Passwrod at least 6 chars")
        .nonempty(`new password is required`),
      rePassword: z
        .string("enter valid password")
        .min(6, "password at least 6 chars")
        .nonempty("Confirm the password"),
    })
    .refine(
      (obj) => {
        return obj.password === obj.rePassword;
      },
      {
        error: "Password do not match",
        path: ["rePassword"],
      }
    );

  const { register, formState, handleSubmit } = useForm<changePassword>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema),
  });

  async function handleChnagePassword(obj: changePassword) {
    setLoading(true);
    try {
      const payload = await changeUserPassword(obj);

      if (payload?.message === "success") {

        
        const res = await signIn("credentials", {
          email: session?.user.email,
          password: obj.password,
          redirect: false,
          callbackUrl: "/",
        });
        if (res?.ok) {
          setLoading(false);
          window.location.href='/';
          toast(`Password updated successfully`, {
            position: "top-right",
            className: "!bg-emerald-500",
          });
        } else {
          throw new Error();
        }
      } else {
        throw new Error(`${payload}`);
      }
    } catch (err) {
      setLoading(false);
      toast(`${err || "Could not update password"}`, {
        position: "top-right",
        className: "!bg-red-500",
      });
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleChnagePassword)}
      className="flex flex-col"
    >
      <header className="p-5 font-poppins flex flex-col">
        <span className="text-xl font-bold">Change your password</span>
        <span className="text-slate-400">
          Update your password associated with your account
        </span>
      </header>
      <div className="p-5">
        <label htmlFor="oldpassword">Current Password</label>
        <Input {...register("currentPassword")} id="oldpassword" />
        {formState.errors.currentPassword && (
          <span className="text-red-500">
            {formState.errors.currentPassword.message}
          </span>
        )}
      </div>
      <div className="p-5">
        <label htmlFor="newpassword">New Password</label>
        <Input {...register("password")} id="newpassword" />
        {formState.errors.password && (
          <span className="text-red-500">
            {formState.errors.password.message}
          </span>
        )}
      </div>
      <div className="p-5">
        <label htmlFor="repassword">Confirm Password</label>
        <Input {...register("rePassword")} id="repassword" />
        {formState.errors.rePassword && (
          <span className="text-red-500">
            {formState.errors.rePassword.message}
          </span>
        )}
      </div>

      <div className="flex justify-end">
        <Button className="cursor-pointer">
          {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Save"}
        </Button>
      </div>
    </form>
  );
}
