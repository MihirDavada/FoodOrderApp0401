import React, { useContext } from "react";
import './MealsItem.css'
import MealsItemForm from "../MealsItemForm/MealsItemForm.jsx";
import CartContext from "../../Store/Context.js";

const MealsItem = (props) => {

  const cartCtx = useContext(CartContext)

  const addToCartHandler = (enteredAmountNumber)=> {
    cartCtx.addItem({
      id:props.id,
      name:props.name,
      price:props.price,
      amount: enteredAmountNumber
    })

  }
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className="meal">
      <div>
        <h3> {props.name} </h3>
        <div className="description">{props.description}</div>
        <div className="price">{price}</div>
      </div>
      <div>
        <MealsItemForm onAddToCart = {addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealsItem;
