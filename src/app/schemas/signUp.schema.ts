  import z from "zod";
  export const signUpSchema=z.object({
    name: z.string().min(5,'Name is required *'),
      email: z.email('Enter a valid email *'),
      password: z.string().regex(/^.{6,}$/,'Password must be atleast 6 characters'),
      rePassword:z.string(),
      phone: z.string().regex(/^01[0-2][0-9]{8}/,'Must be egyptain number *')
  }).refine((obj)=>{
    return obj.password===obj.rePassword;
  },{ error:'Password do not match *',
    path:["rePassword"],
  })

  export type SignUpObject=z.infer<typeof signUpSchema>