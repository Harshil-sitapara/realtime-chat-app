// import { useContext, useEffect, useState } from "react";
// import { ChatContext } from "../context/chat.context";
// import { Button, Container, Stack } from "react-bootstrap";
// import UserChat from "../components/chat/UserChat";
// import { AuthContext } from "../context/auth.context";
// import { Avatar, Box, Skeleton, Typography } from "@mui/material";
// import Separator from "./ChatBox";
// import { ConfigContext } from "../context/config.context";
// import { AddUserModal } from "../components/Modals/AddUserModal";
// import NavbarComponent from "../components/Navbar";

// export interface userChatInterface {
//   _id: String;
//   members: [];
//   createdAt: String;
//   updatedAt: String;
// }

// export default function Chat() {
//   const {
//     userChats,
//     isUserChatsLoading,
//     userChatsError,
//     potentialChats,
//     updateCurrentChat,
//     messages,
//     createChat,
//     allUsers,
//   } = useContext(ChatContext);
//   const {
//     isDarkMode,
//     setSearchTerm,
//     setSearchPaletteVisible,
//     searchTerm,
//     isSearchPaletteVisible,
//   } = useContext(ConfigContext);
//   const { user } = useContext(AuthContext);
//   const [filteredChat, setFilteredChat] = useState();
//   const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

//   useEffect(() => {
//     const rootElement = document?.getElementById("root");
//     if (rootElement) {
//       document.body.style.backgroundColor = isDarkMode ? "#2b2b2b" : "";
//       rootElement.style.backgroundColor = isDarkMode ? "#2b2b2b" : "";
//     }
//   }, [isDarkMode]);

//   const handleOpenAddUserModal = () => {
//     setIsAddUserModalOpen(true);
//   };

//   // Function to close the AddUserModal
//   const handleCloseAddUserModal = () => {
//     setIsAddUserModalOpen(false);
//   };

//   // useEffect(() => {
//   //   const isLightMode = localStorage.getItem("isLightMode");
//   //   const body = document.body;
//   //   body.style.backgroundColor = isLightMode ? "#fff" : "#333";
//   // }, []);
//   // const getFilterChat = (userChats: userChatInterface[]) => {
//   //   console.log("userChats", userChats)
//   //   return userChats?.map((chat: any) => {
//   //     const { recipientUser } = useFetchUserRecipient(user, chat);
//   //     return recipientUser;
//   //   });
//   // };
//   // console.log("getFilterChat", getFilterChat(userChats))

//   // const filters = userChats?.map((chat: any) =>
//   //   useFetchUserRecipient(user, chat)
//   // );

//   // console.log("filters", filters);
//   // const filteredChats = userChats?.filter((chat: any) =>
//   //   chat.recipientUser?.name.toLowerCase().includes(searchTerm.toLowerCase())
//   // );
//   // console.log("FilterChats", filteredChats);

//   return (
//     <>
//      <NavbarComponent />
//       <div
//         style={{
//           backgroundColor: isDarkMode ? "#2b2b2b" : "",
//           color: isDarkMode ? "white" : "",
//         }}
//       >
//         {isUserChatsLoading && (
//           <Stack direction="vertical" gap={3} className="align-items-start">
//             {userChats?.map((chat: userChatInterface, index: string) => (
//               <Box sx={{ display: "flex", alignItems: "center" }} key={index}>
//                 <Box sx={{ margin: 1 }} flexDirection={"row"}>
//                   <Skeleton
//                     variant="circular"
//                     width="100%"
//                     height={40}
//                     animation="wave"
//                   >
//                     <Avatar />
//                   </Skeleton>
//                 </Box>
//                 <Box sx={{ width: "320px" }}>
//                   <Skeleton width="100%" animation="wave">
//                     <Typography>.</Typography>
//                     <Typography sx={{ mt: 1 }}>.</Typography>
//                   </Skeleton>
//                 </Box>
//               </Box>
//             ))}
//           </Stack>
//         )}

//         {!isUserChatsLoading && (
//           <Stack
//             direction="horizontal"
//             gap={1}
//             className="align-items-start"
//             style={{ position: "relative", scrollBehavior: "auto", margin: "auto", width: "98%" }}
//           >
//             <Stack
//               className="messages-box flex-grow-0 pe-3"
//               gap={2}
//               style={{
//                 border: isDarkMode ? "1px solid white" : "",
//               }}
//             >
//               <h4 className="chat-heading">Chats</h4>
//               <div
//                 className="input-search-container"
//               // style={{ backgroundColor: isDarkMode ? "#2b2b2b" : "#f5f5f5" }}
//               >
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="search users..."
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onFocus={() => setSearchPaletteVisible(true)}
//                   onBlur={() => setSearchPaletteVisible(false)}
//                 // disabled
//                 />
//                 {/* <button
//                   type="button"
//                   className={isDarkMode ? "btn btn-light" : "btn btn-dark"}
//                   style={{ marginLeft: "10px" }}
//                   // onClick={() => handleAddUser()}
//                   onClick={() => handleOpenAddUserModal()}
//                 > */}
//                 {/* <AddIcon /> */}
//                 <button
//                   title="Add New"
//                   className="group cursor-pointer outline-none"
//                   onClick={() => handleOpenAddUserModal()}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="50px"
//                     height="50px"
//                     viewBox="0 0 24 24"
//                     className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
//                   >
//                     <path
//                       d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
//                       stroke-width="1.5"
//                     ></path>
//                     <path d="M8 12H16" stroke-width="1.5"></path>
//                     <path d="M12 16V8" stroke-width="1.5"></path>
//                   </svg>
//                 </button>
//               </div>
//               {userChats?.length === 0 && (
//                 <div className="no-chat-main">No chats found!</div>
//               )}
//               {/* Ai Chat */}
//               {/* <div onClick={() => updateCurrentChat(userChats[3])}>
//               <AiChat />
//               </div> */}
//               {userChats?.length > 0 && (
//                 <>
//                   {userChats.map((chat: userChatInterface, index: any) => (
//                     <div key={index} onClick={() => updateCurrentChat(chat)}>
//                        <ul>
//                        <UserChat chat={chat} userInfo={user} index={index} />
//                        </ul>
//                     </div>
//                   ))}
//                 </>
//               )}
//             </Stack>
//             <Separator />
//           </Stack>
//         )}
//         <AddUserModal
//           isOpen={isAddUserModalOpen}
//           handleClose={handleCloseAddUserModal}
//         />
//       </div>
//     </>
//   );
// }

import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chat.context";
import { Button, Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/auth.context";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import Separator from "./ChatBox";
import { ConfigContext } from "../context/config.context";
import { AddUserModal } from "../components/Modals/AddUserModal";
import NavbarComponent from "../components/Navbar";
import "../assets/css/tailwind.css";

export interface userChatInterface {
  _id: String;
  members: [];
  createdAt: String;
  updatedAt: String;
}

export default function Chat() {
  const {
    userChats,
    isUserChatsLoading,
    userChatsError,
    potentialChats,
    updateCurrentChat,
    messages,
    createChat,
    allUsers,
  } = useContext(ChatContext);
  const {
    isDarkMode,
    isChatSelected,
    setIsChatSelected
  } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const [filteredChat, setFilteredChat] = useState();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  console.log("userChats", userChats);

  useEffect(() => {
    const rootElement = document?.getElementById("root");
    if (rootElement) {
      document.body.style.backgroundColor = isDarkMode ? "#2b2b2b" : "";
      rootElement.style.backgroundColor = isDarkMode ? "#2b2b2b" : "";
    }
  }, [isDarkMode]);

  const handleOpenAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  // Function to close the AddUserModal
  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };
  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };


  return (
    <>
      <NavbarComponent />
      <section className="flex w-full justify-between gap-3 ">
        <div className={`pl-4 w-[28%] max-lg:w-[100%] max-lg:pr-4 ${isChatSelected && 'max-lg:hidden'}`}>
          <div className="shadow-1 shadow-box-dark max-md:w-full rounded-lg bg-white py-8 px-6 h-[85vh] overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-dark ">
                Messages
              </h3>
              <div className="relative">
                <button
                  onClick={toggleDropDown}
                  className="text-dark dark:text-white"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z" />
                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" />
                    <path d="M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z" />
                  </svg>
                </button>
                {openDropDown && (
                  <div className="absolute right-0 top-full z-40 w-[200px] space-y-1 rounded bg-white dark:bg-dark p-2 shadow-card">
                    <button
                      className="w-full rounded py-2 px-3 text-left text-sm text-black hover:bg-gray-2 "
                      onClick={() => handleOpenAddUserModal()}
                    >
                      Add user
                    </button>
                    {/* <button className="w-full rounded py-2 px-3 text-left text-sm text-body-color dark:text-dark-6 hover:bg-gray-2 dark:hover:bg-dark-2">
                      Mark as Read
                    </button> */}
                  </div>
                )}
              </div>
            </div>
            <form className="relative mb-3">
              <input
                type="text"
                className="w-full bg-transparent rounded-full border border-stroke dark:border-dark-3 py-[10px] pl-5 pr-10 text-base text-body-color dark:text-dark-6 outline-none focus:border-primary"
                placeholder="Search.."
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-body-color dark:text-dark-6 hover:text-primary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current stroke-current"
                >
                  <path d="M15.0348 14.3131L15.0348 14.3132L15.0377 14.3154C15.0472 14.323 15.0514 14.3294 15.0536 14.3334C15.0559 14.3378 15.0576 14.343 15.0581 14.3496C15.0592 14.3621 15.0563 14.3854 15.0346 14.4127C15.0307 14.4175 15.0275 14.4196 15.0249 14.4208C15.0224 14.422 15.0152 14.425 15 14.425C15.0038 14.425 14.9998 14.4256 14.9885 14.4215C14.9785 14.4178 14.9667 14.4118 14.9549 14.4036L10.7893 11.0362L10.4555 10.7663L10.1383 11.0554C9.10154 12 7.79538 12.525 6.4 12.525C4.933 12.525 3.56006 11.953 2.52855 10.9215C0.398817 8.79172 0.398817 5.3083 2.52855 3.17857C3.56006 2.14706 4.933 1.57501 6.4 1.57501C7.867 1.57501 9.23994 2.14706 10.2714 3.17857L10.2714 3.17857L10.2735 3.18065C12.2161 5.10036 12.3805 8.14757 10.8214 10.2799L10.5409 10.6635L10.9098 10.9631L15.0348 14.3131ZM2.62145 10.8286C3.63934 11.8465 4.96616 12.4 6.4 12.4C7.82815 12.4 9.1825 11.8504 10.1798 10.8273C12.2759 8.75493 12.2713 5.36421 10.1786 3.27146C9.16066 2.25356 7.83384 1.70001 6.4 1.70001C4.96672 1.70001 3.64038 2.25313 2.62264 3.27027C0.524101 5.34244 0.527875 8.73499 2.62145 10.8286Z" />
                </svg>
              </button>
            </form>

            <div className="space-y-3 flex flex-col overflow-scroll w-[100%] max-h-[300px] min-h-[500px] pb-[20px] max-sm:pb-[4rem] ">
              {userChats?.length === 0 && (
                <div className="text-center opacity-50">
                  <p>No chats found!</p>
                </div>
              )}
              {userChats?.length > 0 && (
                <>
                  {userChats.map((chat: userChatInterface, index: any) => (
                    <div key={index} onClick={() => { updateCurrentChat(chat); setIsChatSelected(true) }}>
                      <UserChat chat={chat} userInfo={user} index={index} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={`w-[71%] max-lg:w-[100%] max-sm:overflow-hidden max-sm:px-2 pr-4 ${isChatSelected ? 'max-lg:block' : 'max-lg:hidden'}`}>
          <Separator />
        </div>
        <AddUserModal
          isOpen={isAddUserModalOpen}
          handleClose={handleCloseAddUserModal}
        />
      </section>
    </>
  );
}
