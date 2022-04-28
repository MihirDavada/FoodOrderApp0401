import React, { useContext, useState } from "react";
import "./Cart.css";
import Modal from "../Modal/Modal.jsx";
import CartContext from "../../Store/Context.js";
import CartItem from "../CartItem/CartItem.jsx";
import CheckOut from "../CheckOut/CheckOut.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);
  // console.log(cartCtx)

  const hasItemInCart = cartCtx.items.length > 0;

  const addToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeToCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const closeButtonClicked = () => {
    props.cartHideHandler();
  };

  const orderButtonClicked = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = (userData) => {
    let url =
      "https://food-order-app-95346-default-rtdb.firebaseio.com/orders.json";
    var params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items,
        totalAmount: cartCtx.totalAmount,
      }),
    };

    setIsSubmitting(true);
    fetch(url, params).then((response) => {
      if (!response.ok) {
        throw new Error("Something Went wrong...!!");
      }
      return response.json();
    });
    setIsSubmitting(false);
    setIsSubmitted(true);

    cartCtx.clearCart()
  };

  const modalActionsButtons = (
    <div className="actions">
      <button onClick={closeButtonClicked} className="button--alt">
        Close
      </button>
      {hasItemInCart && (
        <button onClick={orderButtonClicked} className="btn">
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {!isCheckOut && (
        <ul className="cart-items">
          {cartCtx.items.map((meals) => {
            return (
              <CartItem
                key={meals.id}
                id={meals.id}
                name={meals.name}
                amount={meals.amount}
                price={meals.price}
                onAdd={addToCartHandler.bind(null, meals)}
                onRemove={removeToCartHandler.bind(null, meals.id)}
              />
            );
          })}
        </ul>
      )}
      <div className="total">
        <span> Total Amount </span>
        <span>{cartCtx.totalAmount.toFixed(2)}$ </span>
      </div>
      {isCheckOut && (
        <CheckOut
          onConfirm={submitOrderHandler}
          onCancel={closeButtonClicked}
        />
      )}
      {!isCheckOut && modalActionsButtons}
    </>
  );

  const isSubmittingModalContent = <LoadingSpinner />;

  const isSubmittedModalContent = (
    <>
      <p> Successfully Send The Order </p>
      <div className="actions">
        <button onClick={closeButtonClicked} className="btn">
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.cartHideHandler}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && !isSubmitted && isSubmittingModalContent}
      {isSubmitted && !isSubmitting && isSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
