import React from "react";
import {
  LineWave,
  MutatingDots,
  ThreeDots,
  Triangle,
} from "react-loader-spinner";

const FallBack = () => {
  return (
    <div className="fallBack">
      <h3>qmelter</h3>
      <div className="fallBack__loader ">
        <ThreeDots
          height="70"
          width="70"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default FallBack;
