import React, { useContext, useEffect, useState } from "react";
import Session from "supertokens-web-js/recipe/session";
import FriendsContainer from "./friends/FriendsContainer";
import { getAuthUserThunk } from "../store/authUser/authUser.thunk";
import { useAppDispatch } from "../store/hooks";
import Profile from "./Profile";
import { getFriendsThunk } from "../store/friend/friend.thunk";
import Conversation from "./conversation/Conversation";
import { setOpenFriendContainer } from "../store/friend/friend.slice";
import { useFriendRequestReceived } from "../hooks/useFriendRequestReceived";
import { useFriendAccepted } from "../hooks/useFriendAccepted";
import { useFriendDeleted } from "../hooks/useFriendDeleted";
import NewConversation from "./conversation/NewConversation";
import { getConversationsThunk } from "../store/conversation/conversation.thunk";
import { useConversationCreated } from "../hooks/useConversationCreated";
import { useReceivedMessage } from "../hooks/useReceivedMessage";
import { SocketContext } from "../context/socketContext";
import VideoCall from "./call/VideoCall";
import CallingRequest from "./call/CallingRequest";
import { useCallingRequest } from "../hooks/useCallingRequest";

let dataFetchedRef = false;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [openMore, setOpenMore] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  async function logout() {
    await Session.signOut();
    window.location.href = "/signin";
  }

  useEffect(() => {
    if (dataFetchedRef) return;
    dataFetchedRef = true;
    dispatch(getAuthUserThunk());
    dispatch(getFriendsThunk());
    dispatch(getConversationsThunk());
    socket.emit("gettingOnline");
  }, []);

  useFriendRequestReceived();
  useFriendAccepted();
  useFriendDeleted();
  useConversationCreated();
  useReceivedMessage();
  useCallingRequest();

  return (
    <div className="max-w-lg mx-auto flex flex-col relative w-screen h-screen overflow-hidden">
      <div className="pt-10 flex flex-row justify-between px-5 pb-10 bg-[#04E68F]">
        <p className="font-bold text-2xl text-white">WhatsUp</p>
        <div>
          <div className="inline-block relative">
            <button
              onClick={() => setOpenMore(true)}
              className="p-2 rounded-lg bg-[#E2F4F1] cursor-pointer ml-2"
            >
              <img src="/icons/more.svg" className="w-4 h-4" />
            </button>
            {openMore && (
              <ul className="absolute z-20 -bottom-28 -left-6 bg-white rounded-2xl text-[#04E68F] text-sm border border-[#04E68F] overflow-hidden">
                <li
                  onClick={() => {
                    dispatch(setOpenFriendContainer(true));
                    setOpenMore(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Friends
                </li>
                <li
                  onClick={() => {
                    setOpenProfile(true);
                    setOpenMore(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Profile
                </li>
                <li
                  onClick={() => logout()}
                  className="px-4 py-2 hover:bg-gray-200 text-red-500 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">{children}</div>
      {openMore && (
        <div
          onClick={() => setOpenMore(false)}
          className="absolute bg-black opacity-20 z-10 top-0 left-0 w-screen max-w-lg h-screen"
        ></div>
      )}
      <FriendsContainer />
      <Profile openProfile={openProfile} setOpenProfile={setOpenProfile} />
      <Conversation />
      <NewConversation />
      <VideoCall />
      <CallingRequest />
    </div>
  );
};

export default AppLayout;
