// chat.context.tsx
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getRequest, BASE_API_URL, postRequest } from "../utils/services";
import { AuthContext } from "./auth.context";
import { userChatInterface } from "../pages/Chat";

interface ChatContextProps {
  children: ReactNode;
  currentUser: any;
}
interface currentChat {
  _id: string;
  members: [];
  createdAt: string;
  updatedAt: string;
}

export const ChatContext = createContext<any>(null);

export const ChatContextProvider: React.FC<ChatContextProps> = ({
  children,
  currentUser,
}) => {
  const [userChats, setUsersChat] = useState<userChatInterface[]>([]);
  const [userChatsError, setUserChatsError] = useState("");
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState<currentChat | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageError, setMessageError] = useState("");
  const [isMessagesLoading, setMessagesLoading] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState();

  useEffect(() => {
    const getUsers = async () => {
      setIsUserChatsLoading(true);
      setUserChatsError("");
      const response: any = await getRequest(`${BASE_API_URL}/users`);
      if (response?.error) {
        setTimeout(() => {
          setIsUserChatsLoading(false);
        }, 200);
        return console.log("Error while feting users!", response?.error);
      }

      setAllUsers(response.data.users);
      const pChats = response?.data.users.filter((u: any) => {
        let isChatCreated = false;
        if (user?._id === u?._id) return false;
        if (userChats) {
          isChatCreated = (userChats as any[]).some((chat) => {
            return chat?.members[0] == u._id || chat?.members[1] == u._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
      setIsUserChatsLoading(false);
    };
    getUsers();
  }, [userChats]);

  const getUserChats = async () => {
    setIsUserChatsLoading(true);
    setUserChatsError("");

    if (currentUser && currentUser._id) {
      const response: any = await getRequest(
        `${BASE_API_URL}/chats/${currentUser._id}`
      );
      setTimeout(() => {
        setIsUserChatsLoading(false);
      }, 200);

      if (response?.error) {
        setTimeout(() => {
          setIsUserChatsLoading(false);
        }, 200);
        return setUserChatsError(response.error);
      }
      setUsersChat(response?.data);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      setMessagesLoading(true);
      setMessageError("");

      const response: any = await getRequest(
        `${BASE_API_URL}/message/${currentChat?._id}`
      );
      setTimeout(() => {
        setMessagesLoading(false);
      }, 500);

      if (response?.error) {
        setTimeout(() => {
          setMessagesLoading(false);
        }, 500);
        return setMessageError(response.error);
      }
      setMessages(response?.data);
    };
    getMessages();
  }, [currentChat]);

  const updateCurrentChat = (chat: any) => {
    setCurrentChat(chat);
  };

  const createChat = async (firstId: string, secondId: string) => {
    const response: any = await postRequest(`/chats`, {
      firstId,
      secondId,
    });

    if (response?.error) {
      return console.log("Error while create chat..", response.error);
    }

    setUsersChat((prev: userChatInterface[]) => [...prev, response.data]);
  };

  useEffect(() => {
    if (currentUser) {
      getUserChats();
    }
  }, [currentUser]);

  const sendTextMessage = async (
    currentChat: currentChat,
    textMessage: string,
    sender: any,
    setTextMessage:any
  ) => {
    console.log("________currentChat", currentChat);
    console.log("__________textMessage", textMessage);
    console.log("__________sender", sender);
    const response: any = await postRequest(`/message`, {
      chatId: currentChat?._id,
      text: textMessage,
      senderId: sender?._id,
    });

    if (response?.error) {
      return console.log("Error while sending message:", response?.error);
    }
    console.log("response________",response)
    setNewMessage(response);
    setMessages((prev: any[]) => [...prev, response.data]);
    setTextMessage("")
  };

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        messageError,
        isMessagesLoading,
        currentChat,
        sendTextMessage,
        allUsers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
