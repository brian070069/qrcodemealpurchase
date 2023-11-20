import React, { useContext } from "react";
import { ACTION, ShowQrCodeContext } from "./ShowQrCodeContext";

const FoodNotAvailable = () => {
  const [, dispatch] = useContext(ShowQrCodeContext);
  return (
    <div className="readyToPay covertPoints__container">
      <div className="failedPayments">
        <h4>
          some foods are not available,after the scanning the price of those
          foods that are not available will be coverted to points which you can
          use later or use them to purchase another meal instantly...OR JUST
          PURCHASE ANOTHER MEAL, YOU ARE RICH DAWG hahaaa
        </h4>
        <button
          type="button"
          onClick={() => {
            dispatch({ type: ACTION.SHOWQRCODEAREA });
          }}
        >
          agree
        </button>
      </div>
    </div>
  );
};

export default FoodNotAvailable;
