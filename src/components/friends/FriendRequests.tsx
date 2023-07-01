import { toast } from "react-toastify";
import {
  acceptFriendThunk,
  deleteFriendThunk,
} from "../../store/friend/friend.thunk";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { findObj } from "../../utils/helper";
import { FriendStatus } from "../../utils/types";

const FriendRequests = ({
  openFriendRequests,
  setOpenFriendRequests,
}: {
  openFriendRequests: boolean;
  setOpenFriendRequests: (param: boolean) => void;
}) => {
  const friends = useAppSelector((state) => state.friend.friends);
  const authUser = useAppSelector((state) => state.authUser);

  const dispatch = useAppDispatch();

  const handleCancelFriendRequest = async (friendId: string) => {
    const result = await dispatch(deleteFriendThunk(friendId));
    if (deleteFriendThunk.fulfilled.match(result)) {
      toast.success("Cancelled request successfully");
    } else {
      toast.error("Failed to cancel request");
    }
  };

  const handleAcceptFriendRequest = async (friendId: string) => {
    const result = await dispatch(acceptFriendThunk(friendId));
    if (acceptFriendThunk.fulfilled.match(result)) {
      toast.success("Accept request successfully");
    } else {
      toast.error("Failed to accept request");
    }
  };
  return (
    <div
      className={`absolute left-0 bottom-0 h-screen max-w-lg w-screen bg-white z-30 ease-in-out duration-300 ${
        openFriendRequests ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full relative h-full max-w-xl mx-auto">
        <div className="flex flex-row justify-between px-5 pt-10 bg-[#04E68F]">
          <div className="flex flex-row items-center mb-5">
            <button
              onClick={() => setOpenFriendRequests(false)}
              className="mr-5 cursor-pointer"
            >
              <img src="/icons/arrow-left-white.svg" width={25} height={25} />
            </button>
            <h6 className="font-bold text-xl text-white">Friend Requests</h6>
          </div>
        </div>
        <div className="px-5 pt-2">
          {friends
            .filter((friend) => friend.status === FriendStatus.PENDING)
            .map((friend) => {
              const obj = findObj(authUser.id, friend);
              return (
                <div
                  key={friend.id}
                  className="flex flex-row items-center my-3 justify-between"
                >
                  <div className="flex flex-row items-center">
                    <img src={obj.picture} className="w-14 mr-3" />
                    <div>
                      <p className="font-bold">{obj.nickname}</p>
                      <p className="text-sm text-gray-500">{obj.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <button
                      onClick={() => handleCancelFriendRequest(friend.id)}
                      className="p-2 text-xs bg-red-500 text-white rounded-lg font-semibold"
                    >
                      <img src="/icons/close.svg" className="w-3 h-3" />
                    </button>
                    {authUser.id === friend.senderId ? (
                      <></>
                    ) : (
                      <button
                        onClick={() => handleAcceptFriendRequest(friend.id)}
                        className="p-2 text-xs bg-[#04E68F] text-white rounded-lg font-semibold ml-2"
                      >
                        <img src="/icons/check.svg" className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
