import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { SocketContext } from "../context/socketContext";
import {
  setCallingRequestId,
  setIsCallingRequest,
  setIsOpenVideoCall,
} from "../store/conversation/conversation.slice";
let dataFetchedRef = false;

export function useCallingRequest() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!socket || dataFetchedRef) return;
    dataFetchedRef = true;
    socket.on("onReceivedCallingRequest", (payload: string) => {
      console.log("onReceivedCallingRequest");
      dispatch(setIsCallingRequest(true));
      dispatch(setCallingRequestId(payload));
    });
    socket.on("cancelCall", () => {
      dispatch(setIsOpenVideoCall(false));
    });
  }, []);
}
