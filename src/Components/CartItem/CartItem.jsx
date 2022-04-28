import React from 'react';
import './CartItem.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className='cartItem'>
      <div>
        <h2>{props.name}</h2>
        <div className='summer'>
          <span className='prices'>{price}</span>
          <span className='totAmount'>x {props.amount}</span>
        </div>
      </div>
      <div className='actionsItem'>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
