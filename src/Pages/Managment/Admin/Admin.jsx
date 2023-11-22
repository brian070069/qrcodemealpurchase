import { RxHamburgerMenu } from "react-icons/rx";
import Header from "../../Home/components/Header/Header";
import AdminSideBarNavigation from "./Components/AdminSideBarNavigation";
import AllFoodTableStats from "./tableStats/AllFoodTableStats";
import { useState } from "react";

const Admin = () => {
  const [isSideBarshow, setIsSideBarShow] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarShow((prevStatus) => !prevStatus);
  };
  return (
    <div className="admin__container">
      <Header />
      <button className="adminSidebar__btn" onClick={toggleSideBar}>
        <RxHamburgerMenu size={28} />
      </button>
      {isSideBarshow && (
        <AdminSideBarNavigation toggleSideBar={toggleSideBar} />
      )}
      <AllFoodTableStats />
    </div>
  );
};

export default Admin;
