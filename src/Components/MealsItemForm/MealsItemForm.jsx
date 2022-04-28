import React, { useRef, useState } from "react";
import "./MealsItemForm.css";
import Input from "../Input/Input.jsx";

const MealsItemForm = (props) => {
  const inputAmountRef = useRef();
  const [formIsValid, setFormIsValid] = useState(true)

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = inputAmountRef.current.value
    const enteredAmountNumber = +enteredAmount 

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber>8){
      setFormIsValid(false)
      return;
    }
    props.onAddToCart(enteredAmountNumber)

  };
  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <Input
        ref = {inputAmountRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!formIsValid && <p>  Please Enered Valid Amount </p> }
    </form>
  );
};

export default MealsItemForm;
