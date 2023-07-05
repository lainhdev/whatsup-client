import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { Friend } from "../utils/types";
import {
  receivedFriendRequest,
  setOpenFriendRequests,
} from "../store/friend/friend.slice";
import { SocketContext } from "../context/socketContext";
let dataFetchedRef = false;

export function useFriendRequestReceived() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!socket || dataFetchedRef) return;
    console.log({ socket });
    dataFetchedRef = true;
    socket.on('connect', () => {
      console.log("connected")
    })
    socket.on("onFriendRequestReceived", (payload: Friend) => {
      console.log("onFriendRequestReceived");
      dispatch(receivedFriendRequest(payload));
      toast.info(`Incoming Friend Request from ${payload.sender.nickname}`, {
        onClick: () => dispatch(setOpenFriendRequests(true)),
      });
    });

    // return () => {
    //   socket.off("onFriendRequestReceived");
    // };
  }, []);
}
