import NextAuth, { User } from "next-auth"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  
   export interface User{
   user:{
    name:string,
    email:string,
    role:string,
   };
   token:string,
  }
   export interface Session {
    user: User['user']
    id:string
  }

 
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  export interface JWT extends User{
    /** OpenID ID Token */
 idToken?: string
  }
}

