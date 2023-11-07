import React, { useEffect, useState } from "react";
import axios from "axios";

const AllFoodTableStats = () => {
  const [previousRecords, setPreviousRecords] = useState([]);

  const getPreviousRecords = async () => {
    try {
      const response = await axios.get(
        "https://testmanage-20ef9d49fe9a.herokuapp.com/records/dailyrecord/"
      );
      console.log(response.data);
      setPreviousRecords(response.data);
    } catch (error) {
      console.log("errror");
    }
  };

  useEffect(() => {
    getPreviousRecords();
  }, []);

  return (
    <>
      {previousRecords.map((record) => {
        return (
          <div className="foodsSold__info" key={record.dailyrecord_id}>
            <div className="foodStatistics ">
              <div className="foodStatistics__name">{record.food}</div>
              <div className="foodStatistics__premeasuredQuantity">
                under construction
              </div>
              <div className="foodStatistics__ExpectedAmount">
                under construction
              </div>
              <div className="foodStatistics__GottenAmount">
                {record.quantity}
              </div>
              <div className="foodStatistics__Deficiet">under construction</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AllFoodTableStats;
