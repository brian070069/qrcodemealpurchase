import React from "react";
import emptyCart from "../../../../assets/emptycart.svg";

const EmptyCart = () => {
  return (
    <div className="emptyCart">
      <p>Your cart is empty </p>
      <img src={emptyCart} alt="img" />
    </div>
  );
};

export default EmptyCart;
