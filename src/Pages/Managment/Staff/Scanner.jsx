import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { cartBaseUrl } from "../../../services/BaseUrls";
import { useHasHigherResponsibility } from "../../../hooks/useRequireAuth";
import Header from "../../Home/components/Header/Header";
import { getToken } from "../../../libs/getToken";

const Scanner = () => {
  // useHasHigherResponsibility("staff");

  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const inputRef = useRef("");
  const [orderedFood, setOrderedFood] = useState({
    scannedFood: [],
    userInfo: {},
  });

 

  //find scanned food
  const getScannedFood = useCallback(() => {
    const scannedFood = async (idToScan) => {
      const idToScanToLowerCase = idToScan.toLocaleLowerCase();
      setIsLoading(true);
      try {
        const response = await axios.get(
          cartBaseUrl + `orderd-food/${idToScanToLowerCase}/`
        );
        setIsLoading(false);
        toast.success("scanned succesfully", {
          position: "top-center",
        });
        setOrderedFood({
          scannedFood: response.data.ordered_food,
          userInfo: response.data.user,
        });
        console.log(response.data);
        setOrderId("");
        setCounter((prev) => {
          return prev + 1;
        });
      } catch (err) {
        setIsLoading(false);
        setOrderId("");
         setOrderedFood({
          scannedFood: [],
          userInfo: [],
        });
        if (err.response?.data.error) {
          toast.error("Meal qrCode already scanned", {
            position: "top-center",
          });
        } else if (err.request.status === 404) {
          toast.error("fake qrCode", {
            position: "top-center",
          });
        } else if (!err.response) {
          toast.error("failed to contact server please try again", {
            position: "top-right",
          });
        } else {
          console.log(err)
          toast.error("an error occured please try again", {
            position: "top-right",
          });
        }
      }
    };
    scannedFood(orderId);
  }, [orderId]);

  useEffect(() => {
    if (orderId && orderId.length >= 36) {
      getScannedFood();
    }
    inputRef.current.focus();
  }, [orderId]);

  

  return (
    <>
      <Header />
      <div className="counterPanel__Container">
        <section>
          <input
            placeholder="orderId"
            disabled={isLoading}
            value={orderId}
            ref={inputRef}
            onChange={(e) => {
              setOrderId(e.target.value);
              console.log(orderId);
            }}
          />

          <div className="counterUserInfo__container row">
            <section>
              <span className="scannedFoodInfo__left">Name:</span>
              <span className="scannedFoodInfo__right">
                {orderedFood.userInfo.first_name}
              </span>
            </section>
            <section>
              <span className="scannedFoodInfo__left">Phone Number:</span>
              <span className="scannedFoodInfo__right">
                {orderedFood.userInfo.phone_number}
              </span>
            </section>
          </div>
          <section className="order__food">
            <div className="orderedFood__header row">
              <h4>item</h4>
              <h4>Quantity</h4>
              <h4>price</h4>
            </div>
            {isLoading ? (
              <div className="counterSpinner row">
                <TailSpin
                  height="50"
                  width="50"
                  color="red"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{ paddingLeft: "0px" }}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : orderedFood.scannedFood.length > 0 ? (
              orderedFood.scannedFood.map((food) => {
                return (
                  <div className="row scannedFood" key={food.food.food_name}>
                    <span className="scannedFoodName">
                      {food.food.food_name}
                    </span>
                    <span className="scannedQuantity">{food.quantity}</span>
                    <span className="scannedPrice">{food.food.price} </span>
                  </div>
                );
              })
            ) : (
              <span className="counterSpinner row emptyScannedFood">
                nothing scanned yet
              </span>
            )}
          </section>
        </section>
        <div className="row counterIncrement">
          <h2>{counter}</h2>
        </div>
      </div>
    </>
  );
};

export default Scanner;
