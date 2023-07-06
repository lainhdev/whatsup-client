import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { findObj } from "../../utils/helper";
import { Friend } from "../../utils/types";
import { SocketContext } from "../../context/socketContext";
import {
  setIsCallingRequest,
  setIsOpenVideoCall,
} from "../../store/conversation/conversation.slice";

const CallingRequest = () => {
  const conversationState = useAppSelector((state) => state.conversation);
  const authUser = useAppSelector((state) => state.authUser);
  const socket = useContext(SocketContext);
  const conversationCallingRequest = conversationState.conversations.find(
    (c) => c.id === conversationState.callingRequestId
  );
  const dispatch = useAppDispatch();

  if (!conversationCallingRequest) return;

  const obj = findObj(
    authUser.id,
    conversationCallingRequest?.createdBy as Friend
  );

  const handleCancelCall = () => {
    socket.emit("cancelCall", obj.id);
    dispatch(setIsCallingRequest(false));
  };
  const handleAcceptCall = () => {
    dispatch(setIsCallingRequest(false));
    dispatch(setIsOpenVideoCall(true));
  };
  return (
    <div
      className={`absolute left-0 bottom-0 h-screen max-w-lg w-screen bg-white z-[60] ease-in-out duration-300 ${
        conversationState.isCallingRequest
          ? "translate-x-0"
          : "translate-x-full"
      }`}
    >
      <div className="w-full h-full relative flex flex-col items-center justify-between bg-[#04E68F]">
        <div>
          <p className="text-center text-3xl text-white font-bold mt-10">
            WhatsUp
          </p>
        </div>
        <div>
          <img src={obj.picture} className="w-32" />
          <p className="text-center text-2xl font-bold text-white">
            {obj.nickname}
          </p>
          <p className="text-center text-gray-600 text-sm font-bold">
            is calling...
          </p>
        </div>
        <div className="py-10">
          <button
            onClick={() => handleCancelCall()}
            className="p-5 rounded-full bg-[#FF7391] cursor-pointer ml-2"
          >
            <img src="/icons/close.svg" className="w-9 h-9" />
          </button>
          <button
            onClick={() => handleAcceptCall()}
            className="p-5 rounded-full bg-[#E2F4F1] cursor-pointer ml-10"
          >
            <img src="/icons/camera.svg" className="w-10 h-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallingRequest;
