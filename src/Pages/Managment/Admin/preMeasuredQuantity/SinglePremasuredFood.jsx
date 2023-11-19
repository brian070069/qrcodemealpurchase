import axios from "axios";
import React, { useState } from "react";
import { charts } from "../../../../services/BaseUrls";

const SinglePremasuredFood = ({ data }) => {
  const { item } = data;
  const [measuredQty, setMeasuredQty] = useState("");
  const [measuredPtn, setMeasuredPtn] = useState("");

  const addPremeasuredQuantity = async (
    foodName,
    measuredQuantity,
    expectedPortions
  ) => {
    const data = {
      food: foodName,
      measuredFood: measuredQuantity,
      expectedQuantity: expectedPortions,
    };
    try {
      const response = await axios.patch(charts, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="enterPreMeasured__Quantity">
      <h3>{item.food_name}</h3>

      <div className="preMeasuredFood__input">
        <input
          type="text"
          value={measuredQty}
          onChange={(e) => {
            setMeasuredQty(e.target.value);
          }}
        />
      </div>
      <div className="preMeasuredFood__input">
        <input
          type="text"
          value={measuredPtn}
          onChange={(e) => {
            setMeasuredPtn(e.target.value);
          }}
        />
      </div>
      <div className="preMeasuredFood__btn row">
        <button
          type="button"
          onClick={() => {
            addPremeasuredQuantity(item.food_name, measuredQty, measuredPtn);
          }}
        >
          add
        </button>
      </div>
    </div>
  );
};

export default SinglePremasuredFood;
