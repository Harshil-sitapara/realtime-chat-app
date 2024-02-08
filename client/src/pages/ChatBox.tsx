// import React, { useContext, useEffect, useRef, useState } from "react";
// // import { Stack } from "react-bootstrap";
// import Profile from "../assets/profile.svg";
// import SendIcon from "@mui/icons-material/Send";
// import { AuthContext } from "../context/auth.context";
// import { ChatContext } from "../context/chat.context";
// import { useFetchUserRecipient } from "../hooks/useFetchRecipient";
// import moment from "moment";
// import { BASE_API_URL, getRequest, postRequest } from "../utils/services";
// import { ConfigContext } from "../context/config.context";
// import SearchPalette from "../components/SearchPalette";
// import toast, { Toaster } from "react-hot-toast";
// import { IconButton, Menu, MenuItem } from "@mui/material";
// import OptionsIconButton from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { styled } from '@mui/material/styles';
// import Badge from '@mui/material/Badge';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';


// export default function Separator() {
//   const { user } = useContext(AuthContext);
//   const { messages, currentChat, isMessagesLoading, sendTextMessage } =
//     useContext(ChatContext);
//   const { isDarkMode } = useContext(ConfigContext);
//   const { recipientUser } = useFetchUserRecipient(user, currentChat);
//   const [textMessage, setTextMessage] = useState("");
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     chatContainerRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//     });
//   }, [messages, currentChat]);
//   if (recipientUser?.length === 0) {

//     const StyledBadge = styled(Badge)(({ theme }) => ({
//       '& .MuiBadge-badge': {
//         backgroundColor: '#44b700',
//         color: '#44b700',
//         boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//         '&::after': {
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           borderRadius: '50%',
//           animation: 'ripple 1.2s infinite ease-in-out',
//           border: '1px solid currentColor',
//           content: '""',
//         },
//       },
//       '@keyframes ripple': {
//         '0%': {
//           transform: 'scale(.8)',
//           opacity: 1,
//         },
//         '100%': {
//           transform: 'scale(2.4)',
//           opacity: 0,
//         },
//       },
//     }));
//     return (
//       <div className="noChatSelected">
//         <p className="text-cyan-700">Select chat!</p>
//       </div>
//     );
//   }

//   // TODO: Replace this with skeleton
//   if (isMessagesLoading) {
//     return (
//       <div className="spinner-border" role="status" style={{ margin: "auto" }}>
//         <span className="sr-only">Loading conversation...</span>
//       </div>
//     );
//   }

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       if (textMessage.trim() !== "") {
//         sendTextMessage(currentChat, textMessage, user, setTextMessage);
//       } else {
//         toast.error("Message can't be empty!");
//       }
//     }
//   };

//   const options = ["Clear Chat"];
//   const open = Boolean(anchorEl);

//   const ITEM_HEIGHT = 48;

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <Stack
//         className="chatbox"
//         style={{
//           border: isDarkMode ? "1px dashed white" : "",
//         }}
//       >
//         <div className="text-box-header">
//           <div className="chatbox-profile">
//             <div className="me-2 chatbox-avatar-container">
//               <img
//                 src={recipientUser?.profilePhoto?.url ? recipientUser?.profilePhoto?.url : Profile}
//                 alt="Avatar"
//                 height="100%"
//                 width="100%"
//                 style={{
//                   borderRadius: "50%",
//                   border: "1px solid grey",
//                   padding: 1,
//                   backgroundColor: "white",
//                 }}
//               />
//               <div className="chatbox-name">{recipientUser?.name}</div>
//             </div>
//           </div>
//           {/* <div className="chat-options">
//             <OptionsIconButton
//               aria-label="more"
//               id="long-button"
//               aria-controls={"long-menu"}
//               aria-expanded={"true"}
//               aria-haspopup="true"
//               onClick={handleClick}
//             >
//               <MoreVertIcon />
//             </OptionsIconButton>
//             <Menu
//               id="long-menu"
//               MenuListProps={{
//                 "aria-labelledby": "long-button",
//               }}
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "right",
//               }}
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               PaperProps={{
//                 style: {
//                   maxHeight: ITEM_HEIGHT * 4.5,
//                   width: "20ch",
//                   right: 0,
//                   left: "auto",
//                 },
//               }}
//             >
//               {options?.map((option) => (
//                 <MenuItem
//                   key={option}
//                   selected={option === "Pyxis"}
//                   onClick={handleClose}
//                 >
//                   {option}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </div> */}
//         </div>
//         <div className="text-box-main">
//           <div className="" ref={chatContainerRef}>
//             {messages?.length == 0 && (
//               <div
//                 style={{
//                   marginTop: "15dvw",
//                   textAlign: "center",
//                   color: "#00000070",
//                 }}
//               >
//                 <p style={{ color: isDarkMode ? "white" : "" }}>
//                   No conversation with <strong>{recipientUser?.name} </strong>
//                   at!
//                 </p>
//               </div>
//             )}
//             {messages.map((message: any, index: string) => (
//               <div
//                 className={
//                   message?.senderId == user._id
//                     ? "right-msg-main"
//                     : "left-msg-main"
//                 }
//                 key={index}
//               >
//                 <div
//                   className={
//                     message?.senderId == user._id ? "right-msg" : "left-msg"
//                   }
//                 >
//                   <p className="m-0">{message?.text}</p>
//                   <span
//                     className={
//                       message?.senderId == user._id
//                         ? "message-footer-right pr-3"
//                         : "message-footer-left pb-1"
//                     }
//                   >
//                     {moment(message.createdAt).format("LT")}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="text-box-footer">
//           <div className="input-box-main">
//             <input
//               type="text"
//               className="form-control input-box"
//               placeholder="Write something..."
//               onChange={(e) => {
//                 setTextMessage(e.target.value);
//               }}
//               onKeyDown={handleKeyDown}
//               value={textMessage}
//             />

//             <div
//               className="send-btn-main"
//               onClick={() => {
//                 if (textMessage.trim() !== "") {
//                   sendTextMessage(
//                     currentChat,
//                     textMessage,
//                     user,
//                     setTextMessage
//                   );
//                 } else {
//                   toast.error("Message can't be empty!");
//                 }
//               }}
//             >
//               <button type="button" className="send_btn">
//                 <SendIcon className="send-btn" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </Stack>
//     </>
//   );
// }

// export function Separatorr({ line }: { line: string }) {
//   return (
//     <div className="separator">
//       <span className="text">{line}</span>
//     </div>
//   );
// }





import React, { useContext, useEffect, useRef, useState } from "react";
// import { Stack } from "react-bootstrap";
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
          <div className="w-full overflow-y-auto bg-white min-h-[85vh] h-[85vh] rounded-lg border border-stroke" ref={chatContainerRef} data-aos={isChatSelected ? "fade-left" : ""}>
            <div
              className="flex items-center justify-between bg-white border-b border-gray-600 px-6 max-md:px-4 py-[12px] sticky top-0 z-20 select-none"
            >
              <div className="flex items-center">
                <div className="hidden max-md:block cursor-pointer" onClick={() => { setIsChatSelected(false); setCurrentChat(null) }}>
                  <ArrowBackIosIcon />
                </div>
                <div
                  className="mr-4 h-[40px] w-full max-w-[40px] overflow-auto rounded-full border-1 border-black"
                >
                  <img
                    src={recipientUser?.profilePhoto?.url ? recipientUser?.profilePhoto?.url : Profile}
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
                        src={message?.senderId == user._id ? user?.profilePhoto.url : recipientUser?.profilePhoto?.url}
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
            <div className="w-full sticky bottom-0 py-3 z-10 bg-[#F8FAFC]">
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

{/* <button className="absolute right-[18px] top-1/2 -translate-y-1/2 ">
  <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1058_11452)">
                        <path
                          d="M13.0219 9.92812H4.97812C4.78125 9.92812 4.58437 10.0125 4.47187 10.1812C4.35937 10.35 4.30312 10.5469 4.35937 10.7437C4.95 12.825 6.8625 14.2875 9 14.2875C11.1937 14.2875 13.05 12.8812 13.6406 10.7437C13.6969 10.5469 13.6687 10.35 13.5281 10.1812C13.4156 10.0125 13.2187 9.92812 13.0219 9.92812ZM9 12.9937C7.70625 12.9937 6.55312 12.2906 5.90625 11.1937H12.0937C11.475 12.2906 10.3219 12.9937 9 12.9937Z"
                          fill="#F59E0B"
                        />
                        <path
                          d="M9 0.224998C4.1625 0.224998 0.224998 4.1625 0.224998 9C0.224998 13.8375 4.1625 17.8031 9.02812 17.8031C13.8937 17.8031 17.8312 13.8656 17.8312 9C17.8312 4.13437 13.8375 0.224998 9 0.224998ZM9 16.5375C4.8375 16.5375 1.4625 13.1625 1.4625 9C1.4625 4.8375 4.86562 1.49062 9 1.49062C13.1344 1.49062 16.5375 4.86562 16.5375 9.02812C16.5375 13.1906 13.1625 16.5375 9 16.5375Z"
                          fill="#F59E0B"
                        />
                        <path
                          d="M5.625 7.5375C6.24632 7.5375 6.75 7.03382 6.75 6.4125C6.75 5.79118 6.24632 5.2875 5.625 5.2875C5.00368 5.2875 4.5 5.79118 4.5 6.4125C4.5 7.03382 5.00368 7.5375 5.625 7.5375Z"
                          fill="#F59E0B"
                        />
                        <path
                          d="M12.375 7.5375C12.9963 7.5375 13.5 7.03382 13.5 6.4125C13.5 5.79118 12.9963 5.2875 12.375 5.2875C11.7537 5.2875 11.25 5.79118 11.25 6.4125C11.25 7.03382 11.7537 7.5375 12.375 7.5375Z"
                          fill="#F59E0B"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1058_11452">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
  </svg>
</button> */}