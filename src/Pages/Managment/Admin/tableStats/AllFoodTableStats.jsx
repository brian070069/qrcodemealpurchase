import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import TableStatsHeader from "./TableStatsHeader";
import { ColorRing } from "react-loader-spinner";

const AllFoodTableStats = () => {
  const [previousRecords, setPreviousRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const getPreviousRecords = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://testmanage-20ef9d49fe9a.herokuapp.com/records/dailyrecord/"
      );
      setIsLoading(false);
      const salesData = response.data;
      if (salesData) {
        const formatedData = salesData.filter((data) => {
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
            parsedDay === currentDay
          );
        });
        setPreviousRecords(formatedData);
      }
    } catch (error) {
      setIsLoading(false);
      if (!error.response) {
        toast.error("failed to contact server", {
          position: "top-center",
          theme: "dark",
        });
      } else {
        toast.error("unknown error occured please try again", {
          position: "top-center",
          theme: "dark",
        });
      }
    }
  };

  useEffect(() => {
    getPreviousRecords();
  }, [startDate]);

  return (
    <>
      <div className="adminTableSales__filter row">
        <div className="admintTableSales__date">
          <span>Today</span>
          {`${
            new Date().getMonth() + 1
          }/${new Date().getDate()}/${new Date().getFullYear()}`}
        </div>
        <div className="datePicker__container row">
          <h5>pick date</h5>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            wrapperClassName="datePicker"
          />
        </div>
      </div>
      <TableStatsHeader />

      {isLoading ? (
        <div className="adminLoader">
          <ColorRing
            visible={true}
            height="50"
            width="50"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["red", "red", "red", "red", "red"]}
          />
        </div>
      ) : previousRecords.length <= 0 ? (
        <div className="adminLoader">
          <h4>Data for this date does not exist</h4>
        </div>
      ) : (
        previousRecords.map((record) => {
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
        })
      )}
    </>
  );
};

export default AllFoodTableStats;
