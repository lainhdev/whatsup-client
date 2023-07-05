import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Message } from "../utils/types";
import { SocketContext } from "../context/socketContext";
import { receivedMessage } from "../store/conversation/conversation.slice";
let dataFetchedRef = false;

export function useReceivedMessage() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!socket || dataFetchedRef) return;
    dataFetchedRef = true;
    socket.on("onReceivedMessage", (payload: Message) => {
      console.log("onReceivedMessage");
      dispatch(receivedMessage(payload));
    });
  }, []);
}
