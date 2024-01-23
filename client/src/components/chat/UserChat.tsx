import React, { useContext, useState } from "react";
import { userChatInterface } from "../../pages/Chat";
import { useFetchUserRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import Profile from "../../assets/profile.svg";
import { ChatContext, onlineUsers } from "../../context/chat.context";
import unReadNotifications from "../../utils/unReadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";
import { ConfigContext } from "../../context/config.context";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

interface UserChatProps {
  chat: userChatInterface;
  userInfo: any;
  index: Number;
}

const UserChat: React.FC<UserChatProps> = ({ chat, userInfo, index }) => {
  const { recipientUser } = useFetchUserRecipient(userInfo, chat);
  const {
    onlineUsers,
    notifications,
    markSpecificUserNotificationsAsRead,
    currentChat,
  } = useContext(ChatContext);
  const { isDarkMode } = useContext(ConfigContext);
  const [filteredChat, setFilteredChat] = useState<any>(null);

  const { searchTerm } = useContext(ConfigContext);
  // console.log("recipientUser", recipientUser);
  // if (recipientUser?.name && searchTerm && recipientUser.name.includes(searchTerm)) {
  //   setFilteredChat((prev: any) => [...prev, recipientUser]);
  // }

  //   const filterUser = (searchTerm : any) => {
  //     const filter =  recipientUser?.name?.startsWith(searchTerm) ? recipientUser.name : null ;
  //     setFilteredChat(filter)
  //   }
  //  console.log(filterUser(searchTerm));
  //   // const filteredChats = recipientUser?.name === searchTerm;
  //   // console.log("filteredChats",filteredChats)
  //   console.log("filteredChat", filteredChat)

  const unReadNotification = unReadNotifications(notifications);
  const particularUserUnreadNotifications = unReadNotification.filter(
    (n) => n.senderId === recipientUser?._id
  );

  const { latestMessage } = useFetchLatestMessage(chat);
  const truncateTextFunc = (message: any) => {
    return message && message.length > 10
      ? `${message.slice(0, 10)}...`
      : message;
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  return (
    <Stack
      direction="horizontal"
      className={`user-card align-items-center p-2 justify-content-between ${
        index === 0 ? "first-chat" : ""
      }`}
      role="button"
      // data-aos="fade-up"
      onClick={() => {
        if (particularUserUnreadNotifications?.length !== 0) {
          markSpecificUserNotificationsAsRead(
            particularUserUnreadNotifications,
            notifications
          );
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2 avatar-container">
          <img
            src={
              recipientUser?.profilePhoto?.url
                ? recipientUser?.profilePhoto?.url
                : Profile
            }
            alt="Avatar"
            height="40px"
            width="40px"
            style={{
              border: "1px solid grey",
              borderRadius: "50%",
              // padding: 2,
              backgroundColor: "white",
            }}
          />
          {/* "user-online" */}
            <div
              className={
                onlineUsers?.some(
                  (user: onlineUsers) => user?.userId === recipientUser?._id
                )
                  ? "user-online"
                  : ""
              }
            ></div>
        </div>
        <div className="text-content detail-container">
          <div className="name">{recipientUser?.name}</div>
          {/* <div className="text">{latestMessage?.text}</div> */}
          <div className="text">{truncateTextFunc(latestMessage?.text)}</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {latestMessage && moment(latestMessage?.createdAt).calendar()}
        </div>
        {particularUserUnreadNotifications.length !== 0 && (
          <div
            className={
              particularUserUnreadNotifications.length !== 0
                ? "this-user-notifications"
                : ""
            }
          >
            {particularUserUnreadNotifications &&
              particularUserUnreadNotifications.length}
          </div>
        )}
      </div>
    </Stack>
  );
};

export default UserChat;
