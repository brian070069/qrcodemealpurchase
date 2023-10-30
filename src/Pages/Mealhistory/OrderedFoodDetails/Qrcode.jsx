import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { ShowQrCodeContext } from "./ShowQrCodeContext";

const QrCode = ({ props }) => {
  const [, dispatch] = useContext(ShowQrCodeContext);
  const { qr_image, status } = props;

  const hideQrcodeArea = () => {
    dispatch({ type: "***default***" });
  };

  return (
    <div className="qrcodeImage__Container">
      <div className="qrcode__header row">
        <button type="button" onClick={hideQrcodeArea}>
          <i>
            <RxCross2 />
          </i>
        </button>
      </div>
      <div className="qrcodeImage__container">
        {status === "p" ? (
          <img src={qr_image} />
        ) : (
          <span className="scanned">Qrcode was scanned</span>
        )}
      </div>
    </div>
  );
};

export default QrCode;
