import { Product } from './product.interface';
export interface ProductsResponse {

  results: number
  metadata: Metadata
  data: Product[]
}



export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  prevPage?:number
  nextPage?:number
}


