import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Session from "supertokens-web-js/recipe/session";

let dataFetchedRef = false;
const AuthenticationGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  async function doesSessionExist() {
    if (await Session.doesSessionExist()) {
      // user is logged in
    } else {
      navigate("/signin");
    }
  }

  useEffect(() => {
    if (dataFetchedRef) return;
    dataFetchedRef = true;
    doesSessionExist();
  }, []);

  return <>{children}</>;
};

export default AuthenticationGuard;
