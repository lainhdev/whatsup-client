import { useState } from "react";
import ChatsContainer from "../components/chats/ChatsContainer";
import StatusContainer from "../components/status/StatusContainer";

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("CHATS");
  return (
    <div className="h-full flex flex-col">
      <div className="w-auto px-5 pt-5 overflow-hidden bg-[#04E68F]">
        <button
          onClick={() => setSelectedTab("CHATS")}
          className={`w-1/2 text-white font-semibold`}
        >
          CHATS
        </button>
        <button
          onClick={() => setSelectedTab("STATUS")}
          className={`w-1/2 text-white font-semibold `}
        >
          STATUS
        </button>
      </div>

      <div className="border-b-2 border-[#04E68F] pt-2 mb-5 relative bg-[#04E68F]">
        <div className="w-11/12 mx-auto h-1 relative">
          <div
            className={`border-b-2 border-white w-1/2 absolute ease-linear duration-300 ${
              selectedTab === "CHATS" ? "translate-x-0" : "translate-x-full"
            }`}
          ></div>
        </div>
      </div>

      <div className="w-full overflow-hidden flex-grow">
        <div
          className={`w-full h-full px-5 ease-linear duration-300 absolute ${
            selectedTab === "CHATS" ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ChatsContainer />
        </div>
        <div
          className={`w-full h-full px-5 ease-linear duration-300 absolute ${
            selectedTab === "STATUS" ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <StatusContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
