import React, { useCallback, useEffect, useState } from "react";
import "./AvailableMeals.css";
import Card from "../Card/Card.jsx";
import MealsItem from "../MealsItem/MealsItem.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState();

  const fetchDataHandler = useCallback(() => {
    let url =
      "https://food-order-app-95346-default-rtdb.firebaseio.com/meals.json";
    let params = {
      method: "GET",
    };
    fetch(url, params)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Went wrong...!!");
        }
        return response.json();
      })
      .then((responseData) => {
        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }
        // console.log(loadedMeals);

        setMeals(loadedMeals);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  let content = <LoadingSpinner />;
  if (error) {
    content = <p className="error"> {error}</p>;
  }
  if (meals.length > 0) {
    content = (
      <ul>
        {meals.map((meals) => {
          return (
            <MealsItem
              key={meals.id}
              id={meals.id}
              name={meals.name}
              description={meals.description}
              price={meals.price}
            />
          );
        })}
      </ul>
    );
  }

  return (
    <section className="meals">
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
