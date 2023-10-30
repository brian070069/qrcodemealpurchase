import React, { createContext } from "react";
import { useGetCartItems } from "../../hooks/useGetCart";
import { useMpesaPayment } from "../../hooks/useMpesaPayment";

export const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const { isLoadingCart } = useGetCartItems();
  const {
    handleMpesaPayment,
    handleDispalyPaymentArea,
    handleHidePaymentArea,
    showPaymentArea,
    showPhoneNumber,
    isProcessingPayments,
    isPaymentFailed,
    isPaymentSucessful,
    paymentErrorMessages,
    isServerErrors,
    serverErrorMessages,
  } = useMpesaPayment();

  return (
    <HomeContext.Provider
      value={{
        isLoadingCart,
        // mpesa
        handleMpesaPayment,
        handleDispalyPaymentArea,
        handleHidePaymentArea,
        showPaymentArea,
        showPhoneNumber,
        isProcessingPayments,
        isPaymentFailed,
        isPaymentSucessful,
        paymentErrorMessages,
        isServerErrors,
        serverErrorMessages,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
