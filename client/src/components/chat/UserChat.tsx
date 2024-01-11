import React, { useContext } from "react";
import { userChatInterface } from "../../pages/Chat";
import { useFetchUserRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import Profile from "../../assets/profile.svg";
import SearchPalette from "../SearchPalette";
import { ChatContext, onlineUsers } from "../../context/chat.context";
import { ConfigContext } from "../../context/config.context";

interface UserChatProps {
  chat: userChatInterface;
  userInfo: any;
  index: Number;
}

const UserChat: React.FC<UserChatProps> = ({ chat, userInfo, index }) => {
  const { recipientUser } = useFetchUserRecipient(userInfo, chat);
  const { onlineUsers } = useContext(ChatContext);

  return (
    <Stack
      direction="horizontal"
      className={`user-card align-items-center p-2 justify-content-between ${
        index === 0 ? "first-chat" : ""
      }`}
      role="button"
      data-aos="fade-up"
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
          <div className="text">Text message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/12/2023</div>
        <div className="this-user-notifications">2</div>
      </div>
    </Stack>
  );
};

export default UserChat;
