import React from "react";
import TableStatsHeader from "./TableStatsHeader";

const AllFoodTableStats = () => {
  return (
    <>
      <div className="foodsSold__info">
        <div className="foodStatistics ">
          <div className="foodStatistics__name">chicken rice</div>
          <div className="foodStatistics__premeasuredQuantity">100</div>
          <div className="foodStatistics__ExpectedAmount">23000</div>
          <div className="foodStatistics__GottenAmount">20000</div>
          <div className="foodStatistics__Deficiet">-3000</div>
          <div className="foodStatistics__soldQuanity">3323</div>
        </div>
      </div>
    </>
  );
};

export default AllFoodTableStats;
