import { useContext, useEffect, useState } from "react";
import { userChatInterface } from "../pages/Chat";
import { ChatContext, message } from "../context/chat.context";
import { BASE_API_URL, getRequest } from "../utils/services";

export const useFetchLatestMessage = (chat: userChatInterface) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState<message>();

  useEffect(() => {
    const getMessage = async () => {
      const response: any = await getRequest(
        `${BASE_API_URL}/message/${chat?._id}`
      );

      if (response?.error) {
        return console.log(
          "Error while fetching latest message",
          response?.error
        );
      }
      const latestMessage = response?.data[response.data.length - 1]
      setLatestMessage(latestMessage);
    };
    getMessage();
  }, [newMessage, notifications]);

  return { latestMessage };
};
