import { useContext, useEffect, useState } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { ACTION, ShowQrCodeContext } from "./ShowQrCodeContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const SingleOrderDetails = ({ props }) => {
  let { created_at, status, total, order_id, ordered_food, trans_id } = props;
  const [formatedDate, setFormatedDate] = useState("");
  const [formatedTime, setFormatedTime] = useState("");
  const [formatedStatus, setFormatedStatus] = useState("");
  const [, dispatch] = useContext(ShowQrCodeContext);
  const navigate = useNavigate();

  const handleShowQrCodeArea = () => {
    const isEmptyObject = () => {
      return Object.keys(ordered_food[0]).length === 0;
    };
    const checkEmptyObject = isEmptyObject();
    if (checkEmptyObject) {
      return;
    }

    if (status === "c") {
      dispatch({ type: ACTION.SHOWQRCODEAREA });
      return;
    }

    const findNotAvailableFood = ordered_food.find(
      (food) => food.food.is_avilable === false
    );

    if (findNotAvailableFood) {
      dispatch({ type: ACTION.SOMEFOODSNOTAVAILABLE });
    } else {
      dispatch({ type: ACTION.SHOWQRCODEAREA });
    }
  };

  useEffect(() => {
    //format time
    if (created_at) {
      let formatedDate = format(new Date(created_at), "yyyy/MM/dd");
      let formatedTime = format(new Date(created_at), "HH:mm");
      setFormatedDate(formatedDate);
      setFormatedTime(formatedTime);
    }
    //format status
    if (status) {
      status === "p"
        ? setFormatedStatus("active")
        : setFormatedStatus("complete");
    }
  }, [created_at]);

  return (
    <div className="order__details">
      <div className="order__detailsHeader">
        <div className="order__idContainer row ">
          <button className="row" onClick={() => navigate(-1)}>
            <i>
              <HiArrowSmallLeft />
            </i>
          </button>
          <h4 className="orderId">
            Order Id:<span>{order_id?.toUpperCase() || order_id}</span>
          </h4>
        </div>
        <div className="date__transId row">
          <h4>
            Placed on {formatedDate} {formatedTime} hrs
          </h4>
          {trans_id && (
            <div className="row">
              <span className="before">TransId:</span>
              <span className="order__TotalPrice">{trans_id}</span>
            </div>
          )}
        </div>

        <div className="order__detailsStatusContainer row">
          <div className=" row">
            <span className="before">Amount:</span>
            <span className="order__TotalPrice">sh {total}</span>
          </div>
          <span
            className={`order__detailStatus ${
              formatedStatus === "complete" ? "completed" : ""
            }`}
          >
            {formatedStatus}
          </span>
        </div>
        <div className="viewQr__buttonContainer row">
          <button
            className="veiwQr__btn"
            type="button"
            onClick={handleShowQrCodeArea}
          >
            <span>veiw mealqr</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderDetails;
