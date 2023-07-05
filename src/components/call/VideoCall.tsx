import { setIsOpenVideoCall } from "../../store/conversation/conversation.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AgoraUIKit from "agora-react-uikit";

const VideoCall = () => {
  const conversationState = useAppSelector((state) => state.conversation);
  const dispatch = useAppDispatch();

  const rtcProps = {
    appId: import.meta.env.VITE_REACT_AGORA_APP_ID,
    channel:
      conversationState.callingRequestId ||
      conversationState.currentConversation?.id ||
      "",
    tokenUrl: import.meta.env.VITE_REACT_APP_API_SERVER_URL,
    enableAudio: false,
    enablVideo: false,
  };
  const callbacks = {
    EndCall: () => {
      dispatch(setIsOpenVideoCall(false));
    },
  };
  return (
    <div
      className={`absolute max-w-lg left-0 top-0 h-screen w-screen bg-[#000] z-50 ease-in-out duration-500 ${
        conversationState.isOpenVideoCall ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="w-full h-full relative flex flex-col">
        <div className="pt-10 px-5 pb-5 flex flex-row item-centers justify-between">
          <div className="flex flex-row items-center">
            <button onClick={() => dispatch(setIsOpenVideoCall(false))}>
              <img src="/icons/arrow-left.svg" width={20} height={20} />
            </button>
          </div>
          <div></div>
        </div>
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
          {conversationState.isOpenVideoCall && (
            <AgoraUIKit
              rtcProps={rtcProps}
              callbacks={callbacks}
              styleProps={{
                localBtnContainer: { background: "#000" },
                UIKitContainer: {
                  background: "#04E68F",
                  width: "100%",
                  height: "100%",
                },
                usernameText: { color: "" },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
