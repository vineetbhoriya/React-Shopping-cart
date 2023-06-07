import {Button} from "@mui/material"
import { CartItemType } from "../App"

type Props = {
    item:CartItemType,
    handleAddToCart : (clickedItem:CartItemType)=>void;
}

const Item = ({item,handleAddToCart}: Props) => {
  return (
    <div className="flex w-full  flex-col justify-between m-4 mt-0 h-full rounded-lg border p-2 border-pink-200">
        <img src={item.image} className="object-cover p-20 h-[20rem]" alt="" />
        <div className="flex flex-col justify-between items-center w-5/6 mx-auto gap-4 mt-8">
            <h3 className="font-bold text-red-500">{item.title}</h3>
            <p className="max-h-[50px] overflow-hidden">{item.description}</p>
            <h3 className="font-bold text-blue-900 text-lg">${item.price}</h3>
        </div>
        <Button  className="border text-red-600" variant="contained" onClick={()=>handleAddToCart(item)}>Add to cart</Button>
    </div>
  )
}

export default Item