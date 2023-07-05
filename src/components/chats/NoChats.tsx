import { setOpenFriendContainer } from "../../store/friend/friend.slice";
import { useAppDispatch } from "../../store/hooks";

const NoChats = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="h-full">
      <div className="mt-40">
        <img src="no-chat-banner.png" />
        <h6 className="text-2xl text-center font-bold text-[#04E68F] mt-5">
          You haven't chat yet
        </h6>
        <button
          onClick={() => dispatch(setOpenFriendContainer(true))}
          className="font-semibold px-5 py-3 bg-[#04E68F] text-white rounded-full block mx-auto mt-5"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default NoChats;
