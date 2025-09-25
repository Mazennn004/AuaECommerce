"use server";

import getMyToken from "@/utilities/GetMyToken";

export default async function deleteAllCart() {
  const accessToken = await getMyToken();
  try {
    if (accessToken) {
      const response = await fetch(`${process.env.API}/cart`, {
        method: 'DELETE',
        headers: {
          token: accessToken.token,
        },
      });
      if (response.ok) {
        const payload = response.json();
        return payload;
      } else {
        throw new Error("something went wrong, please try again later");
      }
    } else {
      throw new Error("Unauthorized User, Please log In x401");
    }
  } catch (err) {
    console.error(err);
    return `${err || "unexpected Error happened"}`;
  }
}
