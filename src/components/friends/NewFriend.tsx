import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { sendFriendRequestThunk } from "../../store/friend/friend.thunk";
import { toast } from "react-toastify";

const NewFriend = ({
  openNewFriend,
  setOpenNewFriend,
}: {
  openNewFriend: boolean;
  setOpenNewFriend: (param: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const authUser = useAppSelector((state) => state.authUser);
  const friends = useAppSelector((state) => state.friend.friends);

  const dispatch = useAppDispatch();
  const validateEmail = () => {
    if (!email.length) {
      toast.error("email must not be empty");
      return false;
    }
    if (email === authUser.email) {
      toast.error("can't enter your email");
      return false;
    }
    for (let i = 0; i < friends.length; i++) {
      if (
        friends[i].receiver.email === email ||
        friends[i].sender.email === email
      ) {
        toast.error("this friend has been added to your friend list");
        return false;
      }
    }
    return true;
  };

  const handleSendRequest = async () => {
    const isValid = validateEmail();
    if (!isValid) return;
    const result = await dispatch(sendFriendRequestThunk({ email }));
    if (sendFriendRequestThunk.fulfilled.match(result)) {
      setOpenNewFriend(false);
      toast.success("Request has been sent");
    } else {
      toast.error(result.error.message);
    }
  };
  return (
    <div
      className={`absolute left-0 bottom-0 h-screen max-w-lg w-screen bg-white z-30 ease-in-out duration-300 ${
        openNewFriend ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full relative h-full max-w-xl mx-auto">
        <div className="flex flex-row justify-between px-5 pt-10 bg-[#04E68F]">
          <div className="flex flex-row items-center mb-5">
            <button
              onClick={() => setOpenNewFriend(false)}
              className="mr-5 cursor-pointer"
            >
              <img src="/icons/arrow-left-white.svg" width={25} height={25} />
            </button>
            <h6 className="font-bold text-xl text-white">New Friend</h6>
          </div>
        </div>
        <div className="mt-20">
          <img src="/new-friend-banner.png" alt="banner" />
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-11/12 mx-auto border-[#04E68F] border block py-2 px-3 rounded-full mt-5"
          />
          <button
            onClick={() => handleSendRequest()}
            className="w-11/12 mx-auto rounded-full bg-[#04E68F] text-white font-semibold py-2 block mt-5"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFriend;
