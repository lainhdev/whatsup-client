import { useEffect, useState, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setCurrentConversation,
  setIsOpenConversation,
  setIsOpenVideoCall,
} from "../../store/conversation/conversation.slice";
import { findObj } from "../../utils/helper";
import { LoadMoreMessagesDto, User } from "../../utils/types";
import TextareaAutosize from "react-textarea-autosize";
import { SocketContext } from "../../context/socketContext";
import moment from "moment";
import { loadMoreMessagesThunk } from "../../store/conversation/conversation.thunk";

const Conversation = () => {
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);
  const conversationState = useAppSelector((state) => state.conversation);
  const authUser = useAppSelector((state) => state.authUser);
  const [person, setPerson] = useState<User | null>(null);
  const [text, setText] = useState("");
  const [isShowLoadMore, setIsShowLoadMore] = useState(true);

  useEffect(() => {
    if (conversationState.currentConversation) {
      const obj = findObj(
        authUser.id,
        conversationState.currentConversation.createdBy
      );
      setPerson(obj);
    }
  }, [authUser.id, conversationState.currentConversation]);

  const handleSendMessage = () => {
    const params = {
      conversationId: conversationState.currentConversation?.id,
      text,
    };
    socket.emit("sendMessage", params);
  };

  const handleLoadMore = async () => {
    const params: LoadMoreMessagesDto = {
      conversationId: conversationState.currentConversation?.id as string,
      messageId: conversationState.currentConversation?.messages.slice(-1)[0]
        .id as string,
    };
    const result = await dispatch(loadMoreMessagesThunk(params));
    if (loadMoreMessagesThunk.fulfilled.match(result)) {
      if (result.payload.length < 10) {
        setIsShowLoadMore(false);
      }
    }
  };

  const handleCallingRequest = async () => {
    const params = {
      conversationId: conversationState.currentConversation?.id,
      targetUserId: person?.id,
    };
    socket.emit("callingRequest", params);
    dispatch(setIsOpenVideoCall(true));
  };

  return (
    <div
      className={`absolute left-0 bottom-0 h-screen max-w-lg w-screen bg-white z-30 ease-in-out duration-300 ${
        conversationState.isOpenConversation
          ? "translate-x-0"
          : "translate-x-full"
      }`}
    >
      <div className="w-full relative h-full max-w-xl mx-auto flex flex-col">
        <div className="flex flex-row justify-between items-center px-5 pt-10 bg-[#04E68F] pb-5">
          <div className="flex flex-row items-center">
            <button
              onClick={() => {
                dispatch(setIsOpenConversation(false));
                dispatch(setCurrentConversation(null));
              }}
              className="mr-2 cursor-pointer"
            >
              <img src="/icons/arrow-left-white.svg" width={20} height={20} />
            </button>
            <img src={person?.picture} alt="avatar" className="w-8 mr-2" />
            <h6 className="font-bold text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden w-28">
              {person?.nickname}
            </h6>
          </div>
          <div className="flex flex-row items-center">
            <button
              onClick={() => handleCallingRequest()}
              className="p-2 rounded-lg bg-[#E2F4F1] cursor-pointer ml-2"
            >
              <img src="/icons/camera.svg" className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto overflow-x-hidden flex flex-col-reverse">
          {conversationState.currentConversation?.messages.map((message) => {
            return (
              <div
                key={message.id}
                className={`flex items-center ${
                  authUser.id === message.authorId
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                <p
                  className={`mx-5 my-2 px-2 py-1 rounded-xl border border-[#04E68F] max-w-xs break-words ${
                    authUser.id === message.authorId
                      ? ""
                      : "bg-[#04E68F] text-white"
                  }`}
                >
                  {message.text}
                </p>
                <p className="text-xs text-gray-500">
                  {moment(message.createdAt).format("hh:mm")}
                </p>
              </div>
            );
          })}
          {isShowLoadMore && (
            <div className="border-b relative">
              <button
                className="text-xs  text-gray-500 font-semibold absolute top-0 -translate-y-1/2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-full border border-[#04E68F]"
                onClick={() => handleLoadMore()}
              >
                More Messages
              </button>
            </div>
          )}
        </div>
        <div className="p-2 flex flex-row justify-around items-center border-t border-gray-200">
          <TextareaAutosize
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxRows={3}
            className="rounded-xl p-2 border border-[#04E68F] w-10/12"
          />
          <button onClick={() => handleSendMessage()} className="w-1/12">
            <img src="/icons/send.svg" alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
