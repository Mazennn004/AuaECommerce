import z from "zod";

export const updateUserSchema=z.object({
    name:z.string('Enter valid name *').nonempty('Name is required *'),
    email:z.email('enter valid email *').nonempty('email is required *'),
    phone: z.string().nonempty('phone is required *').regex(/^(?:\+20|0)(10|11|12|15)[0-9]{8}$/,'Must be an egyptain number *'),
})

export type updateUserObj=z.infer<typeof updateUserSchema>