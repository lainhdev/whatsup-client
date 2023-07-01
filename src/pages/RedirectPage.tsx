import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

let dataFetchedRef = false;
const RedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (dataFetchedRef) return;
    dataFetchedRef = true;
    const path = location.pathname;
    setTimeout(() => {
      path === "/" ? navigate("/home") : navigate(path);
    }, 1000);
  }, []);

  return (
    <div className="h-screen max-w-lg w-screen mx-auto flex flex-col justify-around overflow-hidden">
      <img src="/signin-banner.png" />
      <HashLoader color="#04E68F" className="block mx-auto" size={80} />
    </div>
  );
};

export default RedirectPage;
