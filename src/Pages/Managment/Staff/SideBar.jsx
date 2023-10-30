import React from "react";
import { Link } from "react-router-dom";
import { IoIosQrScanner } from "react-icons/io";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

const SideBar = () => {
  return (
    <section className="sideBar__navigation">
      <div className="staff__info">
        <h3>brian Gatundu</h3>
      </div>
      <div className="staff__navigation">
        <Link to="/staff/scanner" className="navigation__link">
          <span className="sideBar__icon ">
            <IoIosQrScanner size={21} />
          </span>
          <span className="sideBar__name">scanning</span>
        </Link>
        <Link to="/staff" className="navigation__link">
          <span className="sideBar__icon">
            <MdOutlineTipsAndUpdates size={21} />
          </span>
          <span className="sideBar__name">update items</span>
        </Link>
        <Link to="/staff/addnewitem" className="navigation__link">
          <span className="sideBar__icon">
            <AiOutlineAppstoreAdd size={21} />
          </span>
          <span className="sideBar__name">Add new Item</span>
        </Link>
      </div>
    </section>
  );
};

export default SideBar;
