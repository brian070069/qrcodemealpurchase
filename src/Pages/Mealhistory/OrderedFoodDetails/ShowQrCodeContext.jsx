import React, { createContext, useReducer } from "react";

export const ShowQrCodeContext = createContext();

const initialState = {
  showQrCode: false,
  showQrcodeArea: false,
  someFoodsNotAvailable: false,
};

export const ACTION = {
  SHOWQRCODEAREA: "SHOWQRCODEAREA",
  SHOWQRCODEIMAGE: "SHOWQRCODEIMAGE",
  SOMEFOODSNOTAVAILABLE: "SOMEFOODSNOTAVAILABLE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.SHOWQRCODEAREA:
      return {
        ...state,
        showQrCode: false,
        showQrcodeArea: true,
        someFoodsNotAvailable: false,
      };
    case ACTION.SHOWQRCODEIMAGE:
      return {
        ...state,
        showQrCode: true,
        showQrcodeArea: true,
      };
    case ACTION.SOMEFOODSNOTAVAILABLE:
      return {
        ...state,
        showQrcodeArea: true,
        someFoodsNotAvailable: true,
        showQrCode: false,
      };
    default:
      return initialState;
  }
};

const ShowQrCodeContextProvider = ({ children }) => {
  return (
    <ShowQrCodeContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ShowQrCodeContext.Provider>
  );
};

export default ShowQrCodeContextProvider;
