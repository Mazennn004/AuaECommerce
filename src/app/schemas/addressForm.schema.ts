import z from "zod";

export const addressFormSchema=z.object({
     
        details: z.string().nonempty('Address Details is required *'),
        phone: z.string().nonempty('phone is required *').regex(/^(?:\+20|0)(10|11|12|15)[0-9]{8}$/,'Must be an egyptain number *'),
        city: z.string().nonempty('city is required *'),
        
       method:z.enum(['cod','online'],'Choose your payment method *')
})

export type AddressBook=z.infer<typeof addressFormSchema>