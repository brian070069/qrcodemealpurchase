import HideShowPassword from "../../../components/PasswordInput";
import InLineInputError from "../../../components/InLineInputError";
import HandleFormBtn from "../../../components/HandleFormBtn";
// import Error from "../../../components/Error";
import { useFormik } from "formik";
import { passwordValidationSchema } from "./ShowQrFormValidation";
import { useContext, useState } from "react";
import { ACTION, ShowQrCodeContext } from "./ShowQrCodeContext";
import { AuthenticationContext } from "../../../context/authContext.";
import { useNavigate } from "react-router-dom";
// import { useSetTimeOut } from "../../../hooks/useSetTimeOut";
import WrongCredentials from "../../../components/WrongCredentials";
import { userUrl } from "../../../services/BaseUrls";

const QrCodePassword = () => {
  const [, dispatch] = useContext(ShowQrCodeContext);
  const [loading, setLoading] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [error, setError] = useState(false);
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  //formik
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordValidationSchema,

    //handle show qrCode
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError(false);
        setLoading(false);
        navigate("/login");
        setIsAuthenticated(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(userUrl + "password_checker/", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: values.password }),
        });

        // not authenticatedh
        if (response.status === 401) {
          setError(false);
          setLoading(false);
          setIsAuthenticated(false);
          navigate("/login");
          return;
        }

        if (!response.ok) {
          setLoading(false);
          const data = await response.json();

          //wrong password
          if (data.error) {
            setError(false);
            setLoading(false);
            setWrongPassword(true);
            return;
          }
          setError(true);
          return;
        }

        //success
        setError(false);
        setLoading(false);
        dispatch({ type: ACTION.SHOWQRCODEIMAGE });
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    },
  });

  //hide QrcodeArea
  const handleHideQrCodeArea = () => {
    dispatch({ type: "***default***" });
  };

  return (
    <div className="viewqrcode__formContainer">
      {/* form */}
      <p>
        To veiw the meal qr code you are prompt to enter your password for
        security purposes
      </p>
      <h4>Enter your password</h4>
      <form>
        <HideShowPassword
          name={"password"}
          value={values.password}
          handleChange={handleChange}
          touched={touched.password}
          error={errors.password}
        />
        <InLineInputError touched={touched.password} errors={errors.password} />

        {/* wrong password */}
        {wrongPassword && (
          <WrongCredentials message="the password entered is not correct" />
        )}

        {/* handle Qr buttons */}
        <div className="viewQrcodeBtnContainer row">
          <button
            type="button"
            className="dont__viewqr"
            onClick={handleHideQrCodeArea}
          >
            cancel
          </button>
          <HandleFormBtn
            handleForm={handleSubmit}
            loading={loading}
            content="view"
          />
        </div>
      </form>
    </div>
  );
};

export default QrCodePassword;
