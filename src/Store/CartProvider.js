import React from "react";
import CartContext from "./Context.js";
import { useReducer } from "react";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (preState, action) => {
  if (action.type === "ADD") {
    // console.log(action.item)
    const updatedTotalAmount =
      preState.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = preState.items.findIndex((items) => {
      return items.id === action.item.id;
    });
    // console.log(existingItemIndex)

    const existingItem = preState.items[existingItemIndex];
    // console.log(existingItem)

    let updatedItem;
    let updatedItems = [...preState.items]; //It copies All the Previous Items of the array in updatedItems

    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      // console.log(updatedItem);

      updatedItems[existingItemIndex] = updatedItem;
      // console.log(updatedItems);
    } else {
      updatedItems = preState.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const deleteItemIndex = preState.items.findIndex((items) => {
      return items.id === action.id;
    });
    const deleteItem = preState.items[deleteItemIndex];
    const updatedTotalAmount = preState.totalAmount - deleteItem.price;

    let updatedItem;
    let updatedItems = [...preState.items]; //It copies All the Previous Items of the array in updatedItems

    if (deleteItem.amount === 1) {
      updatedItems = preState.items.filter((item) => {
        return item.id !== action.id;
      });
    }
    else 
    {
      updatedItem = {
        ...deleteItem,
        amount: deleteItem.amount - 1,
      };
      updatedItems[deleteItemIndex] = updatedItem
    }
    return{
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === "CLEAR") {
    return initialState;
  }
  
};

const CartProvider = (props) => {
  const [state, dispatchFunc] = useReducer(cartReducer, initialState);
  // console.log(` Latest State is Items Array ${ state.items} TotalAmount is ${state.totalAmount}  `)

  const addItemToCartHandler = (item) => {
    dispatchFunc({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchFunc({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () =>{
    dispatchFunc({ type: "CLEAR"})
  }

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart : clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
