import { currencyFormatter } from "../../util/fomatting";
import styles from "./CartItem.module.css";

const CartItem = ({ name, quantity, price, onIncrease, onDecrease }) => {
  return (
    <li className={styles["cart-item"]}>
      <p>
        {name} - {quantity}*{currencyFormatter.format(price)}
      </p>
      <p className={styles["cart-item-actions"]}>
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
