import React from "react";
import "./Header.css";
import mealsImage from "../../Images/meals.jpg";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton.jsx";

const Header = (props) => {
  return (
    <>
      <header className="header">
        <h1> GoodMeals </h1>
        <HeaderCartButton onClickHandler = {props.cartShowHandler}/>
      </header>
      <div className="main-image">
        <img src={mealsImage} alt="A Good Meal" />
      </div>
    </>
  );
};

export default Header;
