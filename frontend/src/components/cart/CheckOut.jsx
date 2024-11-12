import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../../util/fomatting";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Input from "../UI/Input";
import styles from "./CheckOut.module.css";
import useHttp from "../../hooks/UseHttp";
import Error from "../error/Error";
// configuration for post request
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

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

  // handle the finish of ordering
  const handleFinish = () => {
    userProgressCtx.hideCheckOut();
    cartCtx.clearCart();
    clearData();
  };

  // custome hook to sent request
  const {
    isLoading: isSending,
    data,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  // function to handle order submittion
  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    // send request to backend
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  };

  // loading state
  let aciton = (
    <>
      <Button textOnly type="button" onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    aciton = <span>Sending order data...</span>;
  }

  // after successfully placing the order
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order has been placed successfully.</p>
        <p className="modal-acitons">
          <Button onClick={handleCloseCheckout}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleFinish}
    >
      <form className={styles.control} onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(cartTotal)} </p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className={styles["control-row"]}>
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit the order" message={error} />}
        <p className="modal-actions">{aciton}</p>
      </form>
    </Modal>
  );
};

export default CheckOut;
