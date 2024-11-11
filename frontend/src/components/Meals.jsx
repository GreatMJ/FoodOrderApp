import { useEffect, useState } from "react";
import styles from "./Meals.module.css";
import MealItem from "./MealItem";
const Meals=()=>{

    const [loadedMeals,setLoadedMeals]=useState([]);

    // fetch meals from server
    useEffect(()=>{
        const fetchMeals=async ()=>{
          
           const response=await fetch("http://localhost:3000/meals");
    
           if(!response.ok){
            // deat it with later
           }
    
           const meals=await response.json();
           setLoadedMeals(meals);
        }

        fetchMeals();
    },[]);
    return <ul id={styles.meals}>
        {
            loadedMeals.map(meal=> <MealItem key={meal.id}  meal={meal}/>)
        }
    </ul> ;
}

export default Meals;