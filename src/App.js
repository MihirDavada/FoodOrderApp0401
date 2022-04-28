import React, { useState } from "react";
import Header from "./Components/Header/Header.jsx";
import Meals from "./Components/Meals/Meals.jsx";
import Cart from "./Components/Cart/Cart.jsx";

const App = () => {

  const [ cartIsShown , SetCartisShown] = useState(false)

  const cartShowHandler = () => {
    SetCartisShown(true)
  }

  const cartHideHandler = () => {
    SetCartisShown(false)
  }

  return (
    <>
      {cartIsShown && <Cart cartShowHandler = {cartShowHandler} cartHideHandler = {cartHideHandler}/>}
      <Header cartShowHandler = {cartShowHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
