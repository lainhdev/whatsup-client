import { useState } from "react";
import OTPScreen from "../components/OTPScreen";
import { createCode } from "supertokens-web-js/recipe/passwordless";
import { toast } from "react-toastify";

const SigninPage = () => {
  const [openOTPScreen, setOpenOTPScreen] = useState(false);
  const [email, setEmail] = useState("");

  async function sendOTP(email: string) {
    try {
      await createCode({
        email,
      });
      toast.info("Please check your email for an OTP");
      setOpenOTPScreen(true);
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        toast.error(err.message);
      } else {
        toast.error("Oops! Something went wrong.");
      }
    }
  }

  return (
    <div className="max-w-lg mx-auto relative flex flex-col justify-around h-screen overflow-hidden">
      <img src="/signin-banner.png" />
      <div>
        <h1 className="text-center text-xl font-bold mb-10">
          Sign in or sign up
        </h1>
        <h6 className="w-11/12 mx-auto px-3 text-gray-500 text-sm">
          Email<sup className="text-[red] text-sm">*</sup>
        </h6>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") sendOTP(email);
          }}
          name="email"
          className="w-11/12 mx-auto block mt-2 border border-[#04E68F] py-2 px-3 rounded-full"
          placeholder="Enter your email"
        />
        <button
          onClick={() => sendOTP(email)}
          className="w-11/12 mx-auto block py-2 bg-[#04E68F] mt-10 rounded-full text-white font-semibold"
        >
          Sign in
        </button>
      </div>
      <div
        className={`absolute left-0 bottom-0 h-screen max-w-lg w-screen bg-white z-30 ease-in-out duration-300 ${
          openOTPScreen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <OTPScreen email={email} setOpenOTPScreen={setOpenOTPScreen} />
      </div>
    </div>
  );
};

export default SigninPage;
