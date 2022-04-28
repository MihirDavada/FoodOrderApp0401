import React, { useContext } from 'react'
import './HeaderCartButton.css'
import CartIcon from '../CartIcon/CartIcon.jsx'
import CartContext from '../../Store/Context.js'

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext)

    const numberOfCartItems = cartCtx.items.reduce((currentNumber, item)=>{
        return currentNumber + item.amount
    }, 0)

    /*  reduce() is a built-in method in the end that is a method which allows us to transform an array of data into 
        a single value into a single number in this case.

        --> It takes two argument ['(currentNumber, item)=>{return currentNumber + item.amount}', 'Intial Value Of currentNumber']

        --> Suppose we have 5 items in array [{amount:0}, {amount:0}, {amount:0}, {amount:0}, {amount:0}]
        
        --> Intially currentNumber is 0 for the first execution of component.
        
        let currentNumber  = 0

        for item in range(length(items)):
            currentNumber = currentNumber + item.amount 
    */

  return (
      <button className='iconButton' onClick={props.onClickHandler}>
          <span className='icon'>
              <CartIcon/>
          </span>
          <span id='yourCart'> Your Cart</span>
          <span className='badge'> {numberOfCartItems} </span>
      </button>
  )
}

export default HeaderCartButton