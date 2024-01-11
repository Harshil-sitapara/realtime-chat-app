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
import { io } from "socket.io-client";

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
export interface onlineUsers {
  userId: string;
  socketId: string;
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
  const [messages, setMessages] = useState<any>([]);
  const [messageError, setMessageError] = useState("");
  const [isMessagesLoading, setMessagesLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState<any>();
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<onlineUsers[]>([]);

  console.log("OnlineUsers", onlineUsers);

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
  useEffect(() => {
    if (currentUser) {
      getUserChats();
    }
  }, [currentUser]);

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

  //NOTE - Initial socket
  useEffect(() => {
    const newSocket = io(`http://localhost:3000`); // socket server URL

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  //NOTE - Add online users
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);

    socket.on("getOnlineUsers", (res: onlineUsers[]) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, user]);

  //NOTE - Send message
  useEffect(() => {
    if (socket === null) {
      console.log("Getting null in socket");
      return;
    }

    const recipientId = currentChat?.members?.find(
      (id: string) => id !== user?._id
    );
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  //NOTE - Receive message
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res: any) => {
      console.log("Received Message:", res);
      console.log("Current Chat:", currentChat);

      if (currentChat?._id !== res?.data.chatId) {
        console.log("Return");
        return;
      }
      setMessages((prev: any) => {
        const updatedMessages = [...prev, res.data];
        console.log("Messages After Update:", updatedMessages);
        return updatedMessages;
      });
      // console.log("Messages After Update:", messages);
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat, messages]);

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

  const sendTextMessage = async (
    currentChat: currentChat,
    textMessage: string,
    sender: any,
    setTextMessage: any
  ) => {
    const response: any = await postRequest(`/message`, {
      chatId: currentChat?._id,
      text: textMessage,
      senderId: sender?._id,
    });

    if (response?.error) {
      return console.log("Error while sending message:", response?.error);
    }
    setNewMessage(response);
    setMessages((prev: any) => [...prev, response.data]);
    setTextMessage("");
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
        allUsers,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
