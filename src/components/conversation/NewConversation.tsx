import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setNewConversation,
  setIsOpenNewConversation,
  setCurrentConversation,
  setIsOpenConversation,
} from "../../store/conversation/conversation.slice";
import { findObj } from "../../utils/helper";
import { CreateFirstMessageDto, User } from "../../utils/types";
import TextareaAutosize from "react-textarea-autosize";
import { createFirstMessage } from "../../utils/api";

const NewConversation = () => {
  const dispatch = useAppDispatch();
  const conversationState = useAppSelector((state) => state.conversation);
  const authUser = useAppSelector((state) => state.authUser);
  const [person, setPerson] = useState<User | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (conversationState.newConversation) {
      const obj = findObj(authUser.id, conversationState.newConversation);
      setPerson(obj);
    }
  }, [authUser.id, conversationState.newConversation]);

  const handleSendMessage = () => {
    const createFirstMessageDto: CreateFirstMessageDto = {
      text,
      friendId: conversationState.newConversation?.id as string,
    };
    createFirstMessage(createFirstMessageDto).then((res) => {
      dispatch(setIsOpenNewConversation(false));
      dispatch(setCurrentConversation(res.data.conversation));
      setTimeout(() => {
        dispatch(setIsOpenConversation(true));
        dispatch(setNewConversation(null));
      }, 300);
    });
  };

  return (
    <div
      className={`absolute left-0 bottom-0 h-screen max-w-lg w-screen bg-white z-30 ease-in-out duration-300 ${
        conversationState.isOpenNewConversation
          ? "translate-x-0"
          : "translate-x-full"
      }`}
    >
      <div className="w-full relative h-full max-w-xl mx-auto flex flex-col">
        <div className="flex flex-row justify-between items-center px-5 pt-10 bg-[#04E68F] pb-5">
          <div className="flex flex-row items-center">
            <button
              onClick={() => {
                dispatch(setIsOpenNewConversation(false));
                dispatch(setNewConversation(null));
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
          <div className="flex flex-row items-center"></div>
        </div>
        <div className="flex-grow overflow-y-auto overflow-x-hidden"></div>
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

export default NewConversation;
