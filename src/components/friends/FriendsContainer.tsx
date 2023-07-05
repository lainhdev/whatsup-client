import { useState } from "react";
import NewFriend from "./NewFriend";
import FriendRequests from "./FriendRequests";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Friend, FriendStatus } from "../../utils/types";
import { findObj } from "../../utils/helper";
import { deleteFriendThunk } from "../../store/friend/friend.thunk";
import { toast } from "react-toastify";
import {
  setCurrentConversation,
  setIsOpenConversation,
  setIsOpenNewConversation,
  setNewConversation,
} from "../../store/conversation/conversation.slice";
import {
  setOpenFriendContainer,
  setOpenFriendRequests,
} from "../../store/friend/friend.slice";

const FriendsContainer = () => {
  const [openNewFriend, setOpenNewFriend] = useState(false);

  const friends = useAppSelector((state) => state.friend.friends);
  const authUser = useAppSelector((state) => state.authUser);
  const conversationState = useAppSelector((state) => state.conversation);
  const openFriendContainer = useAppSelector(
    (state) => state.friend.openFriendContainer
  );

  const dispatch = useAppDispatch();

  const handleCancelFriendRequest = async (friendId: string) => {
    const result = await dispatch(deleteFriendThunk(friendId));
    if (deleteFriendThunk.fulfilled.match(result)) {
      toast.success("Cancelled request successfully");
    } else {
      toast.error("Failed to cancel request");
    }
  };

  const handleOpenChat = (friend: Friend) => {
    console.log({ friend });
    const idxConversation = conversationState.conversations.findIndex(
      (conversation) => conversation.friendId === friend.id
    );
    if (idxConversation > -1) {
      dispatch(setIsOpenConversation(true));
      dispatch(
        setCurrentConversation(conversationState.conversations[idxConversation])
      );
    } else {
      dispatch(setIsOpenNewConversation(true));
      dispatch(setNewConversation(friend));
    }
  };

  return (
    <div
      className={`absolute left-0 bottom-0 h-screen max-w-lg w-screen bg-white z-30 ease-in-out duration-300 ${
        openFriendContainer ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full relative h-full max-w-xl mx-auto">
        <div className="flex flex-row justify-between px-5 pt-10 bg-[#04E68F]">
          <div className="flex flex-row items-center mb-5 justify-between w-full">
            <div className="flex flex-row items-center">
              <button
                onClick={() => dispatch(setOpenFriendContainer(false))}
                className="mr-5 cursor-pointer"
              >
                <img src="/icons/arrow-left-white.svg" width={25} height={25} />
              </button>
              <h6 className="font-bold text-xl text-white">Friends</h6>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center flex-row font-medium mb-3">
            <button
              onClick={() => setOpenNewFriend(true)}
              className="mr-3 p-3 bg-[#04E68F] rounded-full"
            >
              <img src="/icons/people-plus-white.svg" className="w-6 h-6" />
            </button>
            <p onClick={() => setOpenNewFriend(true)}>New Contact</p>
          </div>
          <div className="flex items-center flex-row font-medium my-3">
            <button
              onClick={() => dispatch(setOpenFriendRequests(true))}
              className="mr-3 p-3 bg-[#04E68F] rounded-full"
            >
              <img src="/icons/people-list.svg" className="w-6 h-6" />
            </button>
            <p onClick={() => dispatch(setOpenFriendRequests(true))}>
              Friend Requests
            </p>
          </div>
          {friends.length > 0 &&
            friends
              .filter((friend) => friend.status === FriendStatus.ACCEPTED)
              .map((friend) => {
                const obj = findObj(authUser.id, friend);
                return (
                  <div
                    key={friend.id}
                    className="flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-row items-center">
                      <img src={obj.picture} className="w-14 mr-3" />
                      <div>
                        <p className="font-bold">{obj.nickname}</p>
                        <p className="text-sm text-gray-500">{obj.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <button
                        onClick={() => handleCancelFriendRequest(friend.id)}
                        className="p-2 text-xs bg-red-500 text-white rounded-lg font-semibold"
                      >
                        <img src="/icons/close.svg" className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleOpenChat(friend)}
                        className="p-1 text-xs bg-[#04E68F] text-white rounded-lg font-semibold ml-2"
                      >
                        <img src="/icons/chat.svg" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <NewFriend
        openNewFriend={openNewFriend}
        setOpenNewFriend={setOpenNewFriend}
      />
      <FriendRequests />
    </div>
  );
};

export default FriendsContainer;
