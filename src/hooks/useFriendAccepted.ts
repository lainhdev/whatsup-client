import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { Friend } from "../utils/types";
import { friendAccepted } from "../store/friend/friend.slice";
import { SocketContext } from "../context/socketContext";
let dataFetchedRef = false;

export function useFriendAccepted() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!socket || dataFetchedRef) return;
    dataFetchedRef = true;
    socket.on("onFriendAccepted", (payload: Friend) => {
      console.log("onFriendAccepted");
      dispatch(friendAccepted(payload));
      toast.info(
        `Your Friend Request has been accepted by ${payload.receiver.nickname}`
      );
    });

    // return () => {
    //   socket.off("onFriendAccepted");
    // };
  }, []);
}
