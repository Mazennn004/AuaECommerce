import { Product } from "./product.interface"


export interface ICart {
  status: string
  message?:string
  numOfCartItems: number
  cartId: string
  data: Data
}


export interface Data {
  _id: string
  cartOwner: string
  products: CartProduct[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface CartProduct {
  count: number
  _id: string
  product: Product
  price: number
}

