import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);

    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearCart())
    }
    return(
        <div>
        <div className="p-4 font-bold m-auto text-center">
            <h1>Cart</h1>
            <button className = "bg-green-300 rounded-lg w-25 border border-black" onClick={handleClearCart}>Clear cart</button>
            <h2>Your cart items:</h2>
        </div>
        <div className="m-auto w-6/12">
        <ItemList itemCards={cartItems}/> 
        {cartItems.length === 0 && <h1> Your cart is empty, explore items !!!!!</h1>}
        </div>
        </div>
    )
}

export default Cart;