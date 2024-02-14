import React, { useContext, useState } from "react";
import { userChatInterface } from "../../pages/Chat";
import { useFetchUserRecipient } from "../../hooks/useFetchRecipient";
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
  console.log("currentChat", currentChat)
  const unReadNotification = unReadNotifications(notifications);
  const particularUserUnreadNotifications = unReadNotification.filter(
    (n) => n.senderId === recipientUser?._id
  );

  const { latestMessage } = useFetchLatestMessage(chat);
  const truncateTextFunc = (message: any) => {
    return message && message.length > 10
      ? `${message.slice(0, 20)}...`
      : message;
  };

  return (
    <div className={`flex cursor-pointer items-center rounded-[5px] py-[10px] px-1 hover:bg-gray-2`} onClick={() => {
      if (particularUserUnreadNotifications?.length !== 0) {
        markSpecificUserNotificationsAsRead(
          particularUserUnreadNotifications,
          notifications
        );
      }
    }}>
      <div
        className="relative h-[42px] w-[16%] rounded-full"
      >
        <div
          className="flex mr-4 h-[40px] w-full max-w-[40px] min-w-[40px] overflow-auto rounded-full border-1 border-black"
        >
          <img
            src={recipientUser?.profilePhoto?.url || Profile}
            alt="avatar"
            className="object-cover object-center w-full h-full"
          />
        </div>
        {onlineUsers?.some(
          (user: onlineUsers) => user?.userId === recipientUser?._id
        ) && <span
          className="absolute top-0 right-0 block h-[13px] w-[13px] rounded-full border-[2.3px] border-white dark:border-dark bg-[#219653]"
        ></span>}

      </div>

      <div className="w-full">
        <div className="mb-1 flex justify-between">
          <h5 className="text-sm font-medium text-dark dark:text-white">
            {recipientUser?.name}
          </h5>
          <span className={`text-xs text-body-color dark:text-dark-6 `}>
            {latestMessage && moment(latestMessage?.createdAt).calendar()}
          </span>
        </div>
        <div className="flex justify-between">
          <p className={`text-sm text-dark dark:text-white ${particularUserUnreadNotifications.length > 0 && 'font-bold'}`}>
            {truncateTextFunc(latestMessage?.text)}
          </p>
          {particularUserUnreadNotifications.length > 0 && <span className="flex h-4 w-full max-w-[16px] items-center justify-center rounded-full bg-primary text-[10px] font-medium leading-none text-white">
            {particularUserUnreadNotifications &&
              particularUserUnreadNotifications.length}
          </span>}
        </div>
      </div>
    </div>

  );
};

export default UserChat;
