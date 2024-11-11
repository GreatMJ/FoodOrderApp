
import styles from "./MealItem.module.css";
import { currencyFormatter } from "../util/fomatting";
import Button from "./UI/Button";
const MealItem=({meal})=>{
    return (
        <li className={styles["meal-item"]}>
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className={styles["meal-item-price"]}>{ currencyFormatter.format(meal.price)  }</p>
                    <p className={styles["meal-item-description"]}>{meal.description}</p>
                </div>

                <p className={styles["meal-item-actions"]}>
               <Button>Add to cart</Button>
                </p>
               
            </article>
        </li>
    );
}

export default MealItem;