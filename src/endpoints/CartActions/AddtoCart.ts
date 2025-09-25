"use server";
import getMyToken from "@/utilities/GetMyToken";

export default async function addToCart(pid: string) {
  const token = await getMyToken();
  try {
    if (token) {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "POST",
        headers: {
          token: token.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: pid }),
      });
      const payload = await res.json();
      return payload;
    } else {
      throw new Error("unauthorized User");
    }
  } catch (err) {
    return `${err || "unexpected error occured, please login again"}`;
  }
}
