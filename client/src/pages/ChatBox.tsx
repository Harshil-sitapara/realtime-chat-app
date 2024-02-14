import React, { useContext, useEffect, useRef, useState } from "react";
import Profile from "../assets/profile.svg";
import { AuthContext } from "../context/auth.context";
import { ChatContext, onlineUsers } from "../context/chat.context";
import { useFetchUserRecipient } from "../hooks/useFetchRecipient";
import moment from "moment";
import { ConfigContext } from "../context/config.context";
import toast from "react-hot-toast";
import { useFetchLatestMessage } from "../hooks/useFetchLatestMessage";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import selectChatImg from '../assets/select-chat-img1.png'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function Separator() {
  const { user } = useContext(AuthContext);
  const { messages, currentChat, isMessagesLoading, sendTextMessage, onlineUsers, setCurrentChat } =
    useContext(ChatContext);
  const { isDarkMode, isChatSelected, setIsChatSelected } = useContext(ConfigContext);
  const { recipientUser } = useFetchUserRecipient(user, currentChat);
  const [textMessage, setTextMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { latestMessage } = useFetchLatestMessage(currentChat);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);
  if (recipientUser?.length === 0) {
    return (
      <div className="noChatSelected py-10">
        <div className="pt-[10%]">
          <img src={selectChatImg} alt="image" />
          <p className="text-[25px] py-0 font-[Inter]">Select a conversation </p>
        </div>
        <p className="opacity-50"><LockOutlinedIcon />End-to-end encrypted</p>
      </div>
    );
  }

  // TODO: Replace this with skeleton
  if (isMessagesLoading) {
    return (
      <div className="spinner-border" role="status" style={{ margin: "auto" }}>
        <span className="sr-only">Loading conversation...</span>
      </div>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (textMessage.trim() !== "") {
        sendTextMessage(currentChat, textMessage, user, setTextMessage);
      } else {
        toast.error("Message can't be empty!");
      }
    }
  };

  return (
    <>
      <section className="w-full">
        <div key={isChatSelected}>
          <div className="w-full overflow-y-auto bg-white min-h-[85vh] h-[85vh] rounded-lg border border-stroke -z-40" ref={chatContainerRef} data-aos={isChatSelected ? "fade-left" : ""}>
            <div
              className="flex items-center justify-between bg-white border-b border-gray-600 px-6 max-md:px-4 py-[12px] sticky top-0 z-20 select-none"
            >
              <div className="flex items-center">
                <div className="hidden max-md:block cursor-pointer" onClick={() => { setIsChatSelected(false); setCurrentChat(null) }}>
                  <ArrowBackIosIcon />
                </div>
                <div
                  className="mr-4 h-[40px] w-full min-w-[40px] max-w-[40px] overflow-auto rounded-full border-1 border-black"
                >
                  <img
                    src={recipientUser?.profilePhoto?.url || Profile}
                    alt="avatar"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div>
                  <h5 className="text-base font-medium text-dark">
                    {recipientUser?.name}
                  </h5>
                </div>
              </div>

              {onlineUsers?.some(
                (user: onlineUsers) => user?.userId === recipientUser?._id
              ) && <div>
                  <div
                    className="inline-flex h-[25px] items-center rounded-[3px] border-stroke text-sm font-medium text-dark sm:border sm:bg-[#F8FAFC] sm:px-2 "
                  >
                    <span className="block w-2 h-2 rounded-full bg-green"></span>
                    <span className="ml-[6px] hidden sm:inline"> Active Now </span>
                  </div>
                </div>}

            </div>

            <div className="px-[25px] pt-[30px] relative">
              <div className="mb-6 space-y-3 overflow-y-auto min-h-[55vh]">
                {messages?.length == 0 && (
                  <div className="h-full flex items-center justify-center"
                  >
                    <p className="text-[#00000070] text-center">
                      No conversation with <strong>{recipientUser?.name} </strong>
                      at!
                    </p>
                  </div>
                )}
                {messages.map((message: any, index: string) => (
                  <div key={index} className={`flex w-full ${message?.senderId == user._id && 'justify-end'}`}>
                    <div
                      className="relative mr-[14px] h-10 w-full max-w-[40px] rounded-full border-1 border-black"
                    >
                      <img
                        src={message?.senderId == user._id ? user?.profilePhoto?.url || Profile : recipientUser?.profilePhoto?.url || Profile}
                        alt="avatar"
                        className="object-cover object-center w-full h-full rounded-full"
                      />
                    </div>
                    <div>
                      <div
                        className="mb-[10px] inline-block rounded-[5px] bg-white py-2 px-4 shadow-card"
                      >
                        <p className="text-base text-body-color">
                          {message?.text}
                        </p>
                      </div>
                      <span className="block text-sm text-body-color ">
                        {/* {moment(message.createdAt).format("LT")} */}
                        {moment(latestMessage?.createdAt).calendar()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full sticky bottom-0 py-3 z-10 bg-white">
              <form
                className="flex items-center justify-between space-x-[14px] rounded-md bg-white dark:bg-dark-2 p-2 drop-shadow-md dark:shadow-box-dark w-[95%] mx-auto "
              >
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Type something here..."
                    className="bg-transparent h-11 w-full rounded-[5px] border border-stroke text-black pl-[18px] pr-12 text-base text-body-color outline-none focus:border-primary"
                    onChange={(e) => {
                      setTextMessage(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    value={textMessage}
                  />
                </div>
                <div
                  className="inline-flex items-center justify-center px-4 text-base font-medium text-white rounded-md h-11 whitespace-nowrap bg-[#25d366] hover:bg-[#57f290] cursor-pointer"
                  onClick={() => {
                    if (textMessage.trim() !== "") {
                      sendTextMessage(
                        currentChat,
                        textMessage,
                        user,
                        setTextMessage
                      );
                    } else {
                      toast.error("Message can't be empty!");
                    }
                  }}
                >
                  <span className="hidden pr-[10px] sm:inline"> Send </span>
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.625 9.28125C18.5 9.0625 18.3125 8.90625 18.0937 8.78125L3.6875 0.718748C3.4375 0.593748 3.15625 0.531248 2.875 0.562498C2.59375 0.593748 2.34375 0.687498 2.125 0.874998C1.90625 1.0625 1.75 1.3125 1.6875 1.5625C1.59375 1.84375 1.625 2.125 1.71875 2.40625L4.40625 10L1.71875 17.5937C1.625 17.875 1.625 18.1562 1.6875 18.4062C1.75 18.6875 1.90625 18.9062 2.125 19.0937C2.34375 19.2812 2.59375 19.375 2.875 19.4062C2.90625 19.4062 2.96875 19.4062 3 19.4062C3.21875 19.4062 3.46875 19.3437 3.6875 19.2187L18.0937 11.1562C18.3125 11.0312 18.5 10.875 18.625 10.6562C18.75 10.4375 18.8125 10.1875 18.8125 9.96875C18.8125 9.75 18.75 9.5 18.625 9.28125ZM3.0625 1.96875L16.125 9.28125H5.65625L3.0625 1.96875ZM3.0625 18.0312L5.6875 10.7187H16.1562L3.0625 18.0312Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Separatorr({ line }: { line: string }) {
  return (
    <div className="separator">
      <span className="text">{line}</span>
    </div>
  );
}
