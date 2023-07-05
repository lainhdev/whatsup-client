import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Conversation } from "../utils/types";
import { SocketContext } from "../context/socketContext";
import { addConversation } from "../store/conversation/conversation.slice";
let dataFetchedRef = false;

export function useConversationCreated() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!socket || dataFetchedRef) return;
    dataFetchedRef = true;
    socket.on("onNewConversation", (payload: Conversation) => {
      console.log("onNewConversation");
      dispatch(addConversation(payload));
    });
  }, []);
}
