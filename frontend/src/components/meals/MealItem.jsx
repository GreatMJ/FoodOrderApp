import styles from "./MealItem.module.css";
import { currencyFormatter } from "../../util/fomatting";
import Button from "../UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";

const url = import.meta.env.VITE_APP_URL;
const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  // function to hadnle the add item operation
  const handleAddItem = (item) => {
    cartCtx.addItem(meal);
  };
  return (
    <li className={styles["meal-item"]}>
      <article>
        <img src={`${url}/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className={styles["meal-item-price"]}>
            {currencyFormatter.format(meal.price)}
          </p>
          <p className={styles["meal-item-description"]}>{meal.description}</p>
        </div>

        <p className={styles["meal-item-actions"]}>
          <Button onClick={handleAddItem}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
