import { useContext } from "react";
import QrCode from "./Qrcode";
import QrCodePassword from "./QrCodePassword";
import { ShowQrCodeContext } from "./ShowQrCodeContext";
import FoodNotAvailable from "./FoodNotAvailable";

const ViewQr = ({ orderDetails }) => {
  const [state] = useContext(ShowQrCodeContext);
  const { qr_image, status } = orderDetails;

  return (
    <div className="qrcode__passwordContainer">
      {state?.showQrCode ? (
        <QrCode props={{ qr_image, status }} />
      ) : state.someFoodsNotAvailable ? (
        <FoodNotAvailable />
      ) : (
        <QrCodePassword />
      )}
    </div>
  );
};

export default ViewQr;
