import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/chat.context";
import { Button, Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/auth.context";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import PotentialChats from "../components/chat/PotentialChats";
import Separator from "./ChatBox";
import { ConfigContext } from "../context/config.context";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import { postRequest, user } from "../utils/services";
import { useFetchUserRecipient } from "../hooks/useFetchRecipient";
import FilteredChat from "./FilteredChat";
import AiChat from "./AiChat";
import { AddUserModal } from "../components/Modals/AddUserModal";

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
    setSearchTerm,
    setSearchPaletteVisible,
    searchTerm,
    isSearchPaletteVisible,
  } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const [filteredChat, setFilteredChat] = useState();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

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

  // useEffect(() => {
  //   const isLightMode = localStorage.getItem("isLightMode");
  //   const body = document.body;
  //   body.style.backgroundColor = isLightMode ? "#fff" : "#333";
  // }, []);
  // const getFilterChat = (userChats: userChatInterface[]) => {
  //   console.log("userChats", userChats)
  //   return userChats?.map((chat: any) => {
  //     const { recipientUser } = useFetchUserRecipient(user, chat);
  //     return recipientUser;
  //   });
  // };
  // console.log("getFilterChat", getFilterChat(userChats))

  // const filters = userChats?.map((chat: any) =>
  //   useFetchUserRecipient(user, chat)
  // );

  // console.log("filters", filters);
  // const filteredChats = userChats?.filter((chat: any) =>
  //   chat.recipientUser?.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // console.log("FilterChats", filteredChats);

  return (
    <>
      <Container
        className="mt-3"
        style={{
          backgroundColor: isDarkMode ? "#2b2b2b" : "",
          color: isDarkMode ? "white" : "",
        }}
      >
        {isUserChatsLoading && (
          <Stack direction="vertical" gap={3} className="align-items-start">
            {userChats?.map((chat: userChatInterface, index: string) => (
              <Box sx={{ display: "flex", alignItems: "center" }} key={index}>
                <Box sx={{ margin: 1 }} flexDirection={"row"}>
                  <Skeleton
                    variant="circular"
                    width="100%"
                    height={40}
                    animation="wave"
                  >
                    <Avatar />
                  </Skeleton>
                </Box>
                <Box sx={{ width: "320px" }}>
                  <Skeleton width="100%" animation="wave">
                    <Typography>.</Typography>
                    <Typography sx={{ mt: 1 }}>.</Typography>
                  </Skeleton>
                </Box>
              </Box>
            ))}
          </Stack>
        )}

        {!isUserChatsLoading && (
          <Stack
            direction="horizontal"
            gap={4}
            className="align-items-start"
            style={{ position: "relative", scrollBehavior: "auto" }}
          >
            <Stack
              className="messages-box flex-grow-0 pe-3"
              gap={2}
              style={{
                border: isDarkMode ? "1px dashed white" : "",
              }}
            >
              <h4>Chats</h4>
              <div
                className="input-search-container"
                style={{ backgroundColor: isDarkMode ? "#2b2b2b" : "#f5f5f5" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="search users..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchPaletteVisible(true)}
                  onBlur={() => setSearchPaletteVisible(false)}
                  // disabled
                />
                <button
                  type="button"
                  className={isDarkMode ? "btn btn-light" : "btn btn-dark"}
                  style={{ marginLeft: "10px" }}
                  // onClick={() => handleAddUser()}
                  onClick={() => handleOpenAddUserModal()}
                >
                  <AddIcon />
                </button>
              </div>
              {userChats?.length === 0 && (
                <div className="no-chat-main">No chats found!</div>
              )}
              {/* Ai Chat */}
              {/* <div onClick={() => updateCurrentChat(userChats[3])}>
              <AiChat />
              </div> */}
              {userChats?.length > 0 && (
                <>
                  {userChats.map((chat: userChatInterface, index: any) => (
                    <div key={index} onClick={() => updateCurrentChat(chat)}>
                      <UserChat chat={chat} userInfo={user} index={index} />
                    </div>
                  ))}
                </>
              )}
              {/* {potentialChats.length > 0 && (
                <>
                  <PotentialChats />
                </>
              )} */}
            </Stack>
            <Separator />
          </Stack>
        )}
        <AddUserModal
          isOpen={isAddUserModalOpen}
          handleClose={handleCloseAddUserModal}
        />
      </Container>
    </>
  );
}
