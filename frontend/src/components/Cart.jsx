import Modal from "./UI/Modal";
import styles from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../util/fomatting";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
const Cart=()=>{
 const cartCtx=useContext(CartContext);
  const userProgressContext=useContext(UserProgressContext);

 // calculate the total (price) of the cart items
 const cartTotal=cartCtx.items.reduce((total,item)=>{
    const currentValue=item.quantity*item.price;
    return total+currentValue;
 },0)

 // handle close cart operation
 const handleCloseCart=()=>{
    userProgressContext.hideCart();
 }


    return <Modal className={styles.cart} open={userProgressContext.progress==='cart'}>
    <h2>Your Cart</h2>
    <ul>
       {
        cartCtx.items.map(
            (item) =>( <li key={item.id}> {item.name} - {item.quantity}</li>)
        )
       }
    </ul>
    <p className={styles['cart-total']}> {currencyFormatter.format(cartTotal)} </p>
    <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}> Close</Button>
        <Button >Go to Checkout</Button>
    </p>
    </Modal>;
}

export default Cart;