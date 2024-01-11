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
import { postRequest } from "../utils/services";

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
  } = useContext(ChatContext);
  const {
    isDarkMode,
    setSearchTerm,
    setSearchPaletteVisible,
    searchTerm,
    isSearchPaletteVisible,
  } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   const isLightMode = localStorage.getItem("isLightMode");
  //   const body = document.body;
  //   body.style.backgroundColor = isLightMode ? "#fff" : "#333";
  // }, []);

  const handleAddUser = async () => {
    const { value: email } = await Swal.fire({
      input: "email",
      inputLabel: "Enter email address",
      inputPlaceholder: "Enter email address",
      customClass: {
        input: "custom-swal-input",
      },
      confirmButtonText: "Add",
    });
    if (email) {
      handleAddUserWithEmail(email);
    }
  };

  const handleAddUserWithEmail = async (email: any) => {
    const response: any = await postRequest("/users/findByEmail", { email });
    if (response?.error) {
      console.log("Error while finding user with email!", response?.error);
    }
    if (!response?.data.user) {
      await Swal.fire({
        title: "User Not Found",
        text: "The user with the provided email address was not found.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    if (response?.data.user) {
      await createChat(user?._id, response?.data.user._id);
    }
    console.log("Response with email", response?.data.user);
  };

  return (
    <>
      <Container className="mt-3">
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
            style={{ position: "relative" }}
          >
            <Stack className="messages-box flex-grow-0 pe-3" gap={2}>
              <h4 style={{ fontFamily: "Roboto" }}>Chats</h4>
              <div className="input-search-container">
                <input
                  type="text"
                  className="form-control"
                  placeholder="search users..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchPaletteVisible(true)}
                  onBlur={() => setSearchPaletteVisible(false)}
                  disabled
                />
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleAddUser()}
                >
                  <AddIcon />
                </button>
              </div>
              {userChats?.length === 0 && (
                <div className="no-chat-main">No chats found!</div>
              )}
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
      </Container>
    </>
  );
}
