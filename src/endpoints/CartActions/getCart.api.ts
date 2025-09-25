"use server";

import getMyToken from "@/utilities/GetMyToken";

export default async function getUserCart() {
  const token = await getMyToken();
  try {
    if (token) {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: token.token },
      });
      const payload = await res.json();
      if (payload?.status === "success") {
        return payload;
      } else {
        throw new Error();
      }
    } else {
      throw new Error("not authorized");
    }
  } catch {
    console.warn("not authorized warning");

    return null;
  }
}
