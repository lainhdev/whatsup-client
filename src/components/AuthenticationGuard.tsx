import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Session from "supertokens-web-js/recipe/session";
import { SocketContext } from "../context/socketContext";
import { initSocketConnection } from "../utils/socket";
import { HashLoader } from "react-spinners";
import { Socket } from "socket.io-client";
let dataFetchedRef = false;
const AuthenticationGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket>();

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
    const init = async () => {
      const result = await initSocketConnection();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setSocket(result);
    };
    init();
  }, []);

  if (!socket)
    return (
      <div className="h-screen max-w-lg w-screen mx-auto flex flex-col justify-around overflow-hidden">
        <img src="/signin-banner.png" />
        <HashLoader color="#04E68F" className="block mx-auto" size={80} />
      </div>
    );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default AuthenticationGuard;
