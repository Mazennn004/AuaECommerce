import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "creds",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (creds) => {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: creds?.email,
            password: creds?.password,
          }),
        });
        const payload = await res.json();
        const decoded: { id: string } = jwtDecode(payload.token);

        if (payload.message === "success") {
          return {
            id: decoded.id,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message || "Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user?.user;
        token.token = user?.token;
       token.id=user.id
       
      }
      return token;
    },
    session: async ({ session, token }) => {
      
      session.user = token.user;
      session.id=token.id;
    

      return session;
    },
  },
};
