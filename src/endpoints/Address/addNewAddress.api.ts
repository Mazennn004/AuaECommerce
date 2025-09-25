"use server";

import getMyToken from "@/utilities/GetMyToken";

type Address = {
  details: string;
  city: string;
  phone: string;
};
export default async function addNewAddress(vals: Address) {
  const accessToken = await getMyToken();
  try {
    if (accessToken) {
      const res = await fetch(`${process.env.API}/addresses`, {
        method:'POST',
        headers: {
          token: accessToken.token,
          'Content-Type':'application/json',
        },
        body: JSON.stringify(vals),
      });
      const payload = await res.json();
      if (payload.status === "success") {
        return payload;
      } else {
        throw new Error(`${payload?.message} || 'unexpected error occured`);
      }
    } else {
      throw new Error("unauthorized user");
    }
  } catch (err) {
    console.error(`${err}`);
    return `${err || "somethinh went wrong, try again later"}`;
  }
}
