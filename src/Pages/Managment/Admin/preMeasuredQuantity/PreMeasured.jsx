import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { cartBaseUrl, charts } from "../../../../services/BaseUrls";
import PreMeasuredFoodHeader from "./PreMeasuredFoodheader";
import SinglePremasuredFood from "./SinglePremasuredFood";

const PreMeasured = () => {
  const { fetchedItems: scannedData, isLoadingData } = useFetch(charts, false);
  const { fetchedItems, isLoading } = useFetch(cartBaseUrl + "food/", false);
  const [availableFood, setAvailableFood] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const getScannedFood = (foodName) => {
    //format scanned data
    const formatedData = scannedData.find((data) => {
      const formatedDate = new Date(data.date);
      const newData = { ...data, date: formatedDate };

      const currentYear = startDate.getFullYear();
      const currentMonth = startDate.getMonth();
      const currentDay = startDate.getDate();

      const parsedYear = newData.date.getFullYear();
      const parsedMonth = newData.date.getMonth();
      const parsedDay = newData.date.getDate();

      return (
        parsedYear === currentYear &&
        parsedMonth === currentMonth &&
        parsedDay === currentDay &&
        newData.food === foodName
      );
    });
    return formatedData;
  };

  useEffect(() => {
    if (fetchedItems.length > 0) {
      //get available items
      const availableItems = fetchedItems.filter((item) => {
        return item.is_avilable === true;
      });
      setAvailableFood(availableItems);
    }
  }, [fetchedItems]);

  return (
    <div className="preMeasuredFood__container">
      <PreMeasuredFoodHeader />
      {availableFood.length > 0 &&
        availableFood.map((item) => {
          return (
            <SinglePremasuredFood
              key={item.food_id}
              data={{ item, getScannedFood, scannedData }}
            />
          );
        })}
    </div>
  );
};

export default PreMeasured;
