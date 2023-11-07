import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import Header from "../../Home/components/Header/Header";
import { useEffect } from "react";
import axios from "axios";
import { charts } from "../../../services/BaseUrls";
import AllFoodTableStats from "./tableStats/AllFoodTableStats";
import TableStatsHeader from "./tableStats/TableStatsHeader";

const Admin = () => {
  const data = [
    { name: "pilau", uv: 400, pv: 2400, amt: 2400 },
    { name: "rice", uv: 30, pv: 2400, amt: 2400 },
    { name: "beans", uv: 200, pv: 2400, amt: 2400 },
    { name: "ndengu", uv: 500, pv: 2400, amt: 2400 },
    { name: "tea", uv: 400, pv: 2400, amt: 2400 },
    { name: "ugali", uv: 40, pv: 2400, amt: 2400 },
    { name: "bread", uv: 50, pv: 2400, amt: 2400 },
  ];

  return (
    <>
      <Header />
      <div className="tableDaily__statisticsContainer">
        <TableStatsHeader />
        <AllFoodTableStats />
      </div>
    </>
  );
};

export default Admin;

//  <LineChart
//    width={900}
//    height={300}
//    data={data}
//    margin={{ top: 6, right: 20, bottom: 5, left: 0 }}
//  >
//    <Line type="linear" dataKey="uv" stroke="#8884d8" />
//    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//    <XAxis dataKey="name" />
//    <YAxis />
//  </LineChart>;
