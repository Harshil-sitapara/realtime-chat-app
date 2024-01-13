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
  const [filteredChat,setFilteredChat] = useState<any>(null)

  const { searchTerm } = useContext(ConfigContext);
  // console.log("recipientUser", recipientUser);
  console.log("searchTerm",searchTerm)
  // if (recipientUser?.name && searchTerm && recipientUser.name.includes(searchTerm)) {
  //   setFilteredChat((prev: any) => [...prev, recipientUser]);
  // }
  console.log("recipientUser", recipientUser);

  const filterUser = (searchTerm : any) => {
    const filter =  recipientUser?.name?.startsWith(searchTerm) ? recipientUser.name : null ;
    setFilteredChat(filter)
  }
 console.log(filterUser(searchTerm));
  // const filteredChats = recipientUser?.name === searchTerm;
  // console.log("filteredChats",filteredChats)
  console.log("filteredChat", filteredChat)
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

  return (
    <Stack
      direction="horizontal"
      className={`user-card align-items-center p-2 justify-content-between ${
        index === 0 ? "first-chat" : ""
      }`}
      role="button"
      data-aos="fade-up"
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
          <img src={Profile} alt="Avatar" height="35px" />
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