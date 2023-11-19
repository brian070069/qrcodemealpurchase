import React, { useEffect, useLayoutEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { cartBaseUrl, charts } from "../../../../services/BaseUrls";
import axios from "axios";
import PreMeasuredFoodHeader from "./PreMeasuredFoodheader";
import SinglePremasuredFood from "./SinglePremasuredFood";

const PreMeasured = () => {
  const { fetchedItems, isLoading } = useFetch(cartBaseUrl + "food/", false);
  const [availableFood, setAvailableFood] = useState([]);

  useEffect(() => {
    if (fetchedItems.length > 0) {
      const availableItems = fetchedItems.filter(
        (item) => item.is_avilable === true
      );
      setAvailableFood(availableItems);
    }
  }, [fetchedItems]);

  return (
    <div className="preMeasuredFood__container">
      <PreMeasuredFoodHeader />
      {availableFood.length > 0 &&
        availableFood.map((item) => {
          return <SinglePremasuredFood key={item.food_id} data={{ item }} />;
        })}
    </div>
  );
};

export default PreMeasured;
