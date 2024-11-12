import classes from "./Header.module.css";
import logoImg from "../../assets/logo.jpg";
import Button from "../UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // show cart handler
  const handleShowCart = () => {
    userProgressCtx.showCart();
  };
  // calculate total number of items in cart
  const totalItemsInCart = cartCtx.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <header className={classes["main-header"]}>
      <div className={classes.title}>
        <img src={logoImg} alt="A restaurant" />
        <h1>GreatM Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalItemsInCart})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
