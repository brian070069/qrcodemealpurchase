import { useContext } from "react";
import { HomeContext } from "../../HomeContext";
import { useRedeemPoints } from "../../../../hooks/useRedeemPoints";
import ReadyToPay from "../../../../components/payments/ReadyToPay";
import ProcessingPayments from "../../../../components/payments/ProcessingPayments";
import SuccessfulPayments from "../../../../components/payments/SuccesfulPayments";
import FailedPayments from "../../../../components/payments/FailedPayments";

const PaymentsArea = () => {
  const {
    redeemPoints,
    isRedeemingPoints,
    showRedeemingPhoneNumberArea,
    redeemedSuccesfully,
    failedToRedeem,
    redeemErrorMessage,
    handleHideRedeemArea,
  } = useRedeemPoints();
  const {
    handleMpesaPayment,
    handleHidePaymentArea,
    showPaymentArea,
    showPhoneNumber,
    isProcessingPayments,
    isPaymentFailed,
    isPaymentSucessful,
    paymentErrorMessages,
    serverErrorMessages,
  } = useContext(HomeContext);

  return (
    <>
      {showPaymentArea && (
        <div className="payments row">
          <div className="paymentContainer">
            {showPhoneNumber && showRedeemingPhoneNumberArea && (
              <ReadyToPay
                data={{
                  handleHidePaymentArea,
                  handleMpesaPayment,
                  handleRedeemPoints: redeemPoints,
                }}
              />
            )}

            {/* processing payments */}
            {isProcessingPayments && (
              <ProcessingPayments
                processingPayments
                message={"processing your payments"}
              />
            )}
            {isRedeemingPoints && (
              <ProcessingPayments redeeming message={"redeeming..."} />
            )}

            {/* payment successful */}
            {isPaymentSucessful && (
              <SuccessfulPayments
                props={{
                  message: "payment completed succesfully",
                  handleHidePaymentArea,
                  handleHideRedeemArea,
                }}
              />
            )}
            {redeemedSuccesfully && (
              <SuccessfulPayments
                props={{
                  message: "redeemed succesfully",
                  handleHidePaymentArea,
                  handleHideRedeemArea,
                }}
              />
            )}

            {/* failed payments */}
            {isPaymentFailed && (
              <FailedPayments
                props={{
                  handleHidePaymentArea,
                  paymentErrorMessages,
                  redeemErrorMessage,
                  serverErrorMessages,
                  handleHideRedeemArea,
                }}
              />
            )}
            {failedToRedeem && (
              <FailedPayments
                props={{
                  handleHidePaymentArea,
                  redeemErrorMessage,
                  handleHideRedeemArea,
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentsArea;
