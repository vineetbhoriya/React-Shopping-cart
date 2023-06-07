import { CartItemType } from "../App"
import CartItem from "./CartItem"
type Props = {
  cartItems:CartItemType[],
    handleAddToCart:(clickedItem:CartItemType)=>void
    handleRemoveFromCart:(id:number)=>void
}

const Cart = ({cartItems,handleAddToCart,handleRemoveFromCart}: Props) => {
  const totalAmount = (items: CartItemType[]) =>
  items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  return (
    <div className="w-[500px] p-20">
       <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
      <h2 className="font-bold text-blue-800 text-xl">Total: ${totalAmount(cartItems).toFixed(2)}</h2>

    </div>
  )
}
export default Cart;