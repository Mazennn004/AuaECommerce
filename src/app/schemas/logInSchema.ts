import z from "zod";

export const logInSchema=z.object({
    email:z.email('Enter a valid email *').nonempty('Email is required *'),
    password:z.string().min(6,'Password must be atleast 6 characters *').nonempty('Password is required *'),
})

export type LogInObject=z.infer<typeof logInSchema>