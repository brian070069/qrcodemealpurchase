import Header from "../../Home/components/Header/Header";
import AllFoodTableStats from "./tableStats/AllFoodTableStats";
import PreMeasured from "./preMeasuredQuantity/PreMeasured";

const Admin = () => {
  return (
    <>
      <Header />
      <div className="tableDaily__statisticsContainer">
        <AllFoodTableStats />
      </div>
      <PreMeasured />
    </>
  );
};

export default Admin;
