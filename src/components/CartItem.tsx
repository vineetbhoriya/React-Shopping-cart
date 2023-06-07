import { CartItemType } from "../App"
import {Button} from "@mui/material"

type Props = {
    item:CartItemType,
    handleAddToCart:(clickedItem:CartItemType)=>void
    handleRemoveFromCart:(id:number)=>void
}

const CartItem = ({item,handleAddToCart,handleRemoveFromCart}: Props) => {
  return (
    <div className="flex justify-between border-2 rounded-sm border-gray-300 p-6 mb-4 ">
      <div>
        <h3>
            {item.title}
        </h3>
        <div className="info ">
            <p  className="font-bold text-red-800">${item.price}</p>
            <p  className="font-bold text-red-800">${(item.price *item.amount).toFixed(2)}</p>
        </div>
        <div className="btn flex justify-between max-w-[150px]">
            <Button variant='outlined' onClick={()=>handleAddToCart(item)}>+</Button>
            <p className="p-4">{item.amount}</p>
            <Button variant='outlined' onClick={()=>handleRemoveFromCart(item.id)}>-</Button>
        </div>
      </div>
      <img className="max-w-[100px] object-cover" src={item.image} alt="" />
    </div>
  )
}

export default CartItem