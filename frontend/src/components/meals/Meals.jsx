import { useState } from "react";
import styles from "./Meals.module.css";
import MealItem from "./MealItem";
import useHttp from "../../hooks/UseHttp";
import Error from "../error/Error";
// creating initial data
const requestConfig = {};
const Meals = () => {
  // custom hook to sent http request
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  // if its in loading state
  if (isLoading) {
    return <p className="loading-message">Fetching meals...</p>;
  }

  // handling error situation
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }
  return (
    <ul id={styles.meals}>
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
