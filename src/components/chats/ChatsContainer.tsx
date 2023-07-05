import {
  setCurrentConversation,
  setIsOpenConversation,
} from "../../store/conversation/conversation.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { findObj } from "../../utils/helper";
import NoChats from "./NoChats";
import moment from "moment";

const ChatsContainer = () => {
  const conversationState = useAppSelector((state) => state.conversation);
  const authUser = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();
  return (
    <div className="h-full pb-10 overflow-y-auto chat-container">
      {!conversationState.conversations.length && <NoChats />}

      {conversationState.conversations.map((conversation) => {
        const obj = findObj(authUser.id, conversation.createdBy);
        return (
          <div
            onClick={() => {
              dispatch(setCurrentConversation(conversation));
              dispatch(setIsOpenConversation(true));
            }}
            key={conversation.id}
            className="flex flex-row items-center justify-between"
          >
            <div className="flex flex-row items-center">
              <img src={obj.picture} className="w-14 mr-5" />
              <div>
                <p className="font-semibold">{obj.nickname}</p>
                <p className="text-gray-500 text-sm">
                  {conversation.lastMessage.text}
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                {moment(conversation.lastMessage.createdAt).format("DD/MM/YY")}
              </p>
              <p className="text-sm text-gray-500">
                {moment(conversation.lastMessage.createdAt).format("hh:mm")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatsContainer;
