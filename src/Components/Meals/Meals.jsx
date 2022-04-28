import React from "react";
import AvailableMeals from "../AvailableMeals/AvailableMeals.jsx";
import MealsSummary from "../MealsSummary/MealsSummary.jsx";

const Meals = () => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;
