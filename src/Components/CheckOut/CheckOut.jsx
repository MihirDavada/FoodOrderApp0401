import React, { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const CheckOut = (props) => {

  const [formValidation, setFormValidation ] = useState({
    name:true,
    street:true,
    postal:true,
    city:true
  })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const isEmpty = (value) => {
    return value.trim().length === 0;
  };

  const isFiveChars = (value) => {
    return value.trim().length === 5;
  };

  const confirmSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormValidation({
      name:enteredNameIsValid,
      street:enteredStreetIsValid,
      postal:enteredPostalIsValid,
      city:enteredCityIsValid
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid){
      return
    }

    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      postal:enteredPostal,
      // city:enteredCity
    })

  };
  return (
    <form className={classes.form} onSubmit={confirmSubmitHandler}>
      <div className={` ${classes.control} ${ formValidation.name ? '':classes.invalid}`}>
        <label htmlFor="name"> Your Name </label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formValidation.name && <p> Please Enter Valid Email </p>}
      </div>

      <div className={` ${classes.control} ${ formValidation.street? '':classes.invalid}`}>
        <label htmlFor="street"> Street </label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formValidation.street && <p> Please Enter Valid Street </p>}
      </div>

      <div className={` ${classes.control} ${ formValidation.postal ? '':classes.invalid}`}>
        <label htmlFor="postal"> Postal Code </label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formValidation.postal && <p> Please Enter Valid PostalCode( 5 Char) </p>}
      </div>

      <div className={` ${classes.control} ${ formValidation.city ? '':classes.invalid}`}>
        <label htmlFor="city"> City </label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formValidation.city && <p> Please Enter Valid City </p>}
      </div>

      <div className={classes.actions}>
        <button
          onClick={() => {
            props.onCancel();
          }}
        >
          Cancel
        </button>

        <button onClick={confirmSubmitHandler} className={classes.submit} type="button">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
