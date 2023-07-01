import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentRoom, setIsOpenRoom } from "../../store/room/room.slice";
import { findObj } from "../../utils/helper";
import { User } from "../../utils/types";
import TextareaAutosize from "react-textarea-autosize";

const Room = () => {
  const dispatch = useAppDispatch();
  const roomState = useAppSelector((state) => state.room);
  const authUser = useAppSelector((state) => state.authUser);
  const [person, setPerson] = useState<User | null>(null);

  useEffect(() => {
    if (roomState.currentRoom) {
      const obj = findObj(authUser.id, roomState.currentRoom);
      setPerson(obj);
    }
  }, [authUser.id, roomState.currentRoom]);

  return (
    <div
      className={`absolute left-0 bottom-0 h-screen max-w-lg w-screen bg-white z-30 ease-in-out duration-300 ${
        roomState.isOpenRoom ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full relative h-full max-w-xl mx-auto flex flex-col">
        <div className="flex flex-row justify-between items-center px-5 pt-10 bg-[#04E68F] pb-5">
          <div className="flex flex-row items-center">
            <button
              onClick={() => {
                dispatch(setIsOpenRoom(false));
                dispatch(setCurrentRoom(null));
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
            <button className="p-2 rounded-lg bg-[#E2F4F1] cursor-pointer ml-2">
              <img src="/icons/call.svg" className="w-3 h-3" />
            </button>
            <button className="p-2 rounded-lg bg-[#E2F4F1] cursor-pointer ml-2">
              <img src="/icons/camera.svg" className="w-3 h-3" />
            </button>
            <button className="p-2 rounded-lg bg-[#E2F4F1] cursor-pointer ml-2">
              <img src="/icons/more.svg" className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
        </div>
        <div className="p-2 flex flex-row justify-around items-center border-t border-gray-200">
          <TextareaAutosize maxRows={3} className="rounded-xl p-2 border border-[#04E68F] w-10/12" />
          <button className="w-1/12">
            <img src="/icons/send.svg" alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
