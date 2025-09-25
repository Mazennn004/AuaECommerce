"use client";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CartProduct, ICart } from "@/app/interfaces/cart.interface";
import updateQuantity from "@/endpoints/CartActions/updateCart.api";
import { useContext , useState} from "react";
import { cartContext } from "@/app/Context/CartContext";
import { toast } from "sonner";
import deleteProduct from "@/endpoints/CartActions/deleteProduct.api";
export default function CartItem({
  item,
  cart,
  setCart,
  setItems,
  disabled,setDisabled
}: {
  item: CartProduct;
  cart: ICart | undefined;
  setCart: React.Dispatch<React.SetStateAction<ICart | undefined>>;
  setItems: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  disabled:boolean | undefined
  setDisabled:React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { cartCount, setCartCount } = useContext(cartContext);
  const[updateLoading,setupdateLoading]=useState<boolean>(false);
  const[deleteLoading,setDeleteLoading]=useState<boolean>(false);
  async function handleUpdate(sign: string, count: number) {
    setupdateLoading(true);
    setDisabled(true);
    try {
      const payload: ICart = await updateQuantity(item.product._id, count);
      if (payload.status === "success") {
          setDisabled(false);
        setupdateLoading(false)
        setCart(payload);
        setItems(payload.data.products);
      if(sign==='+'){
          setCartCount(cartCount! + 1);
      }else{
        if(item.count===1){
          setCartCount(cartCount! - 1);
          const updated=payload.data.products.map((p)=>{return {pid:p.product._id}})
          localStorage.setItem('cart',JSON.stringify(updated));
        }
setCartCount(cartCount! - 1);
      }
      }else{
        throw new Error(payload.message);
      }
    } catch (err) {
      setupdateLoading(false);
      setDisabled(false);
      toast(
        `${err|| "Something went wrong, please try again later"}`,
        {
          position:'top-right',
          className:'!bg-red-500',
          icon:<i className="fa-solid fa-xmark me-2 text-md"></i>
        }
      );
    }
  }
  async function handleDelete(id:string){
    setDeleteLoading(true);
    setDisabled(true);
    try{
      const payload:ICart=await deleteProduct(id);
      if(payload.status==='success'){
        setDeleteLoading(false);
    setDisabled(false);
     setCart(payload);
        setItems(payload.data.products);
        setCartCount(cartCount ? cartCount-item.count: 0);
         const updated=payload.data.products.map((p)=>{return {pid:p.product._id}})
          localStorage.setItem('cart',JSON.stringify(updated));
          toast('Item deleted Successfully',{position:'top-right',className:'!bg-emerald-500',icon:<i className="fa-solid fa-check me-2 text-md"></i>})
      }else{
        throw new Error(payload.message)
      }
    
    }catch(err){
         setDeleteLoading(false);
    setDisabled(false);
     toast(`${err || 'Could not delete product'}`,{position:'top-right',className:'!bg-red-500',icon:<i className="fa-solid fa-xmark me-2 text-md"></i>})
      console.error(err);
    }
  }

  return (
    <div className="cart-card ">
      <Separator />
      <div className="flex justify-between">
        <div className="productImg lg:p-2 flex">
          <figure className="rounded-lg">
            <Image
              src={item.product.imageCover}
              alt="cart-img"
              className=" h-[100px] rounded-lg md:h-[200px] object-cover"
              height={200}
              width={200}
            />
          </figure>
          <div className="flex justify-between">
            <div className="actions  p-4  flex flex-col justify-between ">
              <div className="content flex flex-col w-[100px] lg:w-[200px]">
                <span className="lg:font-bold font-medium lg:text-xl text-sm">
                  {item.product.title.split(" ", 5).join(" ")}
                </span>
                <span className="text-slate-400 lg:text-md">
                  {item?.product?.category?.name}
                </span>
                <span className="text-slate-400 lg:text-md">
                  {item?.product?.brand?.name}
                </span>
              </div>
              <span className="font-bold text-lg">{item.price} EGP</span>
            </div>
            <div className="p-4">
              <div className="border-[1px] border-slate-400 rounded flex flex-row">
                <button
                disabled={disabled}
                  onClick={() => {
                    handleUpdate("+", item.count + 1);
                  }}
                  className="px-3 rounded text-slate-600 cursor-pointer disabled:cursor-not-allowed"
                >
                  +
                </button>
                <span className="px-2 border-x-[1px] border-slate-400 text-slate-600">
                 {updateLoading ? <i className="fa-solid fa-spinner fa-spin"></i>:item.count}
                </span>
                <button onClick={()=>{ handleUpdate('-',item.count-1)
                }} disabled={disabled} className="px-3  rounded text-slate-600 cursor-pointer disabled:cursor-not-allowed">
                  -
                </button>
              </div>
            </div>
          </div>
        </div>

        <button onClick={()=>{handleDelete(item.product._id)}} disabled={disabled} type='button' title="delete" className="delete flex flex-col justify-end disabled:cursor-not-allowed cursor-pointer">
          {deleteLoading ? <i className='fa-solid fa-spinner fa-spin'></i>:<i className="fa-regular fa-trash-can text-slate-400 m-5 text-lg "></i>}
        </button>
      </div>
      <Separator />
    </div>
  );
}
