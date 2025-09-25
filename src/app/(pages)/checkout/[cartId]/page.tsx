"use client";
import React, { use, useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AddressForm from "./../../../_components/AddressBookForm/AddressForm";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddressBook,
  addressFormSchema,
} from "@/app/schemas/addressForm.schema";
import { createCashOrder } from "@/endpoints/Payment/cashOrder.api";
import { useParams, useRouter } from "next/navigation";
import { cartContext } from "@/app/Context/CartContext";
import { toast } from "sonner";
import { createOnlineOrder } from "@/endpoints/Payment/onlineOrder.api";
import getUserAddress from "@/endpoints/Address/getLoggedUserAddress.api";
import addresCard from "@/app/_components/AddressCard/addresCard";
import AddresCard from "@/app/_components/AddressCard/addresCard";
import { addressArray, AddressCard } from "@/app/interfaces/address.interface";

export default function Checkout() {
  const { cartId }: { cartId: string } = useParams();
  const [addresses, setAddresses] = useState<AddressCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { setCartCount } = useContext(cartContext);
  const router = useRouter();
  const [price, setPrice] = useState<number>();
  const payment = useForm<AddressBook>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      method: undefined,
    },
    resolver: zodResolver(addressFormSchema),
  });
  const { register, formState, handleSubmit, setValue } = payment;
  useEffect(() => {
    setPrice(Number(localStorage.getItem("total")!) + 15);
  }, []);

  async function pay(obj: AddressBook) {
    setLoading(true);
    const userAddress = {
      shippingAddress: {
        details: obj.details,
        phone: obj.phone,
        city: obj.city,
      },
    };
    if (obj.method === "cod") {
      try {
        const payload = await createCashOrder(cartId, userAddress);
        if (payload.status === "success") {
          setLoading(false);
          localStorage.setItem("cart", `[]`);
          setCartCount(0);
          router.push("/allorders");
        } else {
          throw new Error("something went wrong, please try again later");
        }
      } catch (err) {
        setLoading(false);
        toast(`${err || "Could not complete payment, please try again later"}`);
      }
    } else {
      try {
        const payload = await createOnlineOrder(cartId, userAddress, "");
        console.log(payload);

        if (payload.status === "success") {
          console.log(payload);

          localStorage.setItem("cart", "[]");
          setCartCount(0);
          window.location.href = `${payload?.session.url}`;
        } else {
          throw new Error("something went wrong, please try again later");
        }
      } catch (err) {
        setLoading(false);
        toast(
          `${err || "Could not complete payment, please try again later"}`,
          {
            position: "top-right",
            className: "!bg-red-400",
            icon: <i className="fa-solid fa-xmark me-2"></i>,
          }
        );
      }
    }
  }


  return (
    <>
      <form
        onSubmit={handleSubmit(pay)}
        className="flex flex-wrap p-5 h-screen"
      >
        <div className="address-form w-full lg:w-[70%] shadow-lg rounded-lg p-5">
          <header className="font-poppins">
            <h1 className="text-xl font-bold">Shipping Address</h1>
          </header>
          <AddressForm
            register={register}
            formState={formState}
            setValue={setValue}
          />

  
          <div className="flex w-full mt-5 flex-col">
            <h2 className="font-poppins text-lg font-bold">Payment Method</h2>
            {formState.errors.method && (
              <span className="text-red-500 text-md">
                {formState?.errors?.method.message}
              </span>
            )}
            <div className="flex flex-col">
              <input
                type="radio"
                id="cod"
                value={"cod"}
                {...register("method")}
                className="peer/cod"
                hidden
              />
              <input
                type="radio"
                id="online"
                value={"online"}
                {...register("method")}
                className="peer/online"
                hidden
              />
              <label
                htmlFor="cod"
                className="rounded-md border-2 mt-5 cursor-pointer peer-checked/cod:border-main p-5"
              >
                <span className="font-poppins font-bold text-md">
                  Cash On Deliveiry (COD)
                </span>
                <span className="text-slate-400 block">4-6 Business days</span>
              </label>
              <label
                htmlFor="online"
                className="rounded-md border-2 mt-5 cursor-pointer peer-checked/online:border-main p-5"
              >
                <span className="font-poppins font-bold text-md">
                  Credit Card
                </span>
                <span className="text-slate-400 block">4-10 Business days</span>
              </label>
            </div>
          </div>
        </div>
        <div className="summary w-full lg:w-[30%] shadow-lg rounded-lg p-5">
          <div className="inner">
            <div className="bg-slate-50 rounded p-5">
              <span className="text-md font-semibold">Order Summary</span>

              <Separator className="mt-3 bg-slate-300" />
              <div className="flex justify-between">
                <span className="text-xs mt-5 font-semibold text-slate-500">
                  Shipping
                </span>
                <span className="text-xs mt-5 font-semibold">15 EGP</span>
              </div>
              <Separator className="mt-5 bg-slate-300" />
              <div className="flex justify-between">
                <span className="text-sm mt-5 font-semibold">Order total</span>
                <span className="text-xs mt-5 font-semibold">{price} EGP</span>
              </div>
              <Button className="mt-4 w-full cursor-pointer">
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Pay"
                )}
              </Button>
              <div className="flex justify-center w-full">
                <Link
                  href="/products"
                  className="mt-5 text-main cursor-pointer text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
