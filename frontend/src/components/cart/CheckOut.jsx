import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../../util/fomatting";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Input from "../UI/Input";
import styles from "./CheckOut.module.css";

const CheckOut = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  // calculate the total (price) of the cart items
  const cartTotal = cartCtx.items.reduce((total, item) => {
    const currentValue = item.quantity * item.price;
    return total + currentValue;
  }, 0);

  // function to handle the closing of checkout form
  const handleCloseCheckout = () => {
    userProgressCtx.hideCheckOut();
  };

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form className={styles.control}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(cartTotal)} </p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className={styles["control-row"]}>
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default CheckOut;
