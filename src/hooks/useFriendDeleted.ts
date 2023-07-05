import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Friend } from "../utils/types";
import { friendDeleted } from "../store/friend/friend.slice";
import { SocketContext } from "../context/socketContext";
let dataFetchedRef = false;

export function useFriendDeleted() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!socket || dataFetchedRef) return;
    dataFetchedRef = true;
    socket.on("onFriendDeleted", (payload: Friend) => {
      console.log("onFriendDeleted");
      dispatch(friendDeleted(payload));
    });
  }, []);
}
