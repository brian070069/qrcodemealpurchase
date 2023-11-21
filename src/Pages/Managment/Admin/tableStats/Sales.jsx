import React from "react";

const Sales = ({ previousRecords }) => {
  return (
    <>
      {previousRecords.map((record) => {
        return (
          <div className="foodsSold__info" key={record.dailyrecord_id}>
            <div className="foodStatistics ">
              <div className="foodStatistics__name">{record.food}</div>
              <div className="foodStatistics__premeasuredQuantity">
                {record.measuredFood}
              </div>
              <div className="foodStatistics__Deficiet">
                {record.expectedQuantity}
              </div>
              <div className="foodStatistics__GottenAmount">
                {record.quantity}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Sales;
