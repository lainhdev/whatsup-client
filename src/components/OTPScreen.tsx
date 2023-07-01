import { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import {
  consumeCode,
  resendCode,
} from "supertokens-web-js/recipe/passwordless";

const OTPScreen = ({
  setOpenOTPScreen,
  email,
}: {
  email: string;
  setOpenOTPScreen: (param: boolean) => void;
}) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(2);
  const [isResendedCode, setIsResendedCode] = useState(false);
  const intervalRef = useRef(0);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalRef.current);
    }
  }, [timer]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  async function resendOTP() {
    try {
      setIsResendedCode(true);
      const response = await resendCode();

      if (response.status === "RESTART_FLOW_ERROR") {
        toast.error("Login failed. Please try again");
        window.location.assign("/auth");
      } else {
        toast.success("Please check your email for the OTP");
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        toast.error(err.message);
      } else {
        toast.error("Oops! Something went wrong.");
      }
    }
  }

  async function handleOTPInput(otp: string) {
    try {
      const response = await consumeCode({
        userInputCode: otp,
      });

      if (response.status === "OK") {
        if (response.createdNewUser) {
          // user sign up success
        } else {
          // user sign in success
        }
        window.location.assign("/home");
      } else if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
        // the user entered an invalid OTP
        toast.error(
          "Wrong OTP! Please try again. Number of attempts left: " +
            (response.maximumCodeInputAttempts -
              response.failedCodeInputAttemptCount)
        );
      } else if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
        // it can come here if the entered OTP was correct, but has expired because
        // it was generated too long ago.
        toast.error(
          "Old OTP entered. Please regenerate a new one and try again"
        );
      } else {
        // this can happen if the user tried an incorrect OTP too many times.
        toast.error("Login failed. Please try again");
        window.location.assign("/auth");
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        toast.error(err.message);
      } else {
        toast.error("Oops! Something went wrong.");
      }
    }
  }

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex flex-row justify-between px-5 pt-10">
        <div className="flex flex-row items-center">
          <button
            onClick={() => setOpenOTPScreen(false)}
            className="mr-5 cursor-pointer"
          >
            <img src="/icons/arrow-left.svg" width={20} height={20} />
          </button>
          <h6 className="font-bold text-xl">Enter OTP Code</h6>
        </div>
      </div>
      <div>
        <p className="text-center text-sm text-gray-500">
          Code has been send to{" "}
          <span className="font-bold text-gray-700">{email}</span>
        </p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          containerStyle={"otp-input"}
        />
        <p className="text-sm text-center mt-5">
          Resend code in <span className="text-[#04E68F]">{timer}s</span>
        </p>
        {timer === 0 && (
          <button
            onClick={() => resendOTP()}
            disabled={isResendedCode}
            className={` py-2 px-3 text-sm block mx-auto mt-3 rounded-2xl text-white ${
              isResendedCode ? "bg-[#5ad9a8]" : "bg-[#04E68F]"
            }`}
          >
            Resend
          </button>
        )}
      </div>
      <button
        onClick={() => handleOTPInput(otp)}
        className="mb-10 block w-11/12 mx-auto bg-[#04E68F] text-white py-2 rounded-full font-semibold"
      >
        Verify
      </button>
    </div>
  );
};

export default OTPScreen;
