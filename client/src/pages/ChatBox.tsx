import React, { useContext, useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import Profile from "../assets/profile.svg";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../context/auth.context";
import { ChatContext } from "../context/chat.context";
import { useFetchUserRecipient } from "../hooks/useFetchRecipient";
import moment from "moment";
import { BASE_API_URL, getRequest, postRequest } from "../utils/services";
import { ConfigContext } from "../context/config.context";
import SearchPalette from "../components/SearchPalette";
import toast, { Toaster } from "react-hot-toast";

export default function Separator() {
  const { user } = useContext(AuthContext);
  const { messages, currentChat, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchUserRecipient(user, currentChat);
  const [textMessage, setTextMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages,currentChat]);
  

  if (recipientUser?.length === 0) {
    return (
      <div className="noChatSelected">
        <p>Select chat!</p>
      </div>
    );
  }

  // TODO: Replace this with skeleton
  if (isMessagesLoading) {
    return (
      <div className="spinner-border" role="status" style={{ margin: "auto" }}>
        <span className="sr-only">Loading conversation...</span>
      </div>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (textMessage.trim() !== "") {
        sendTextMessage(currentChat, textMessage, user, setTextMessage);
      } else {
        toast.error("Message can't be empty!");
      }
    }
  };

  return (
    <>
      <Stack className="chatbox">
        <div className="text-box-header">
          <div className="chatbox-profile">
            <div className="me-2 chatbox-avatar-container">
              <img src={Profile} alt="Avatar" height="35px" />
              <div className="chatbox-name">{recipientUser?.name}</div>
            </div>
          </div>
        </div>
        <div className="text-box-main">
          <div className="container" ref={chatContainerRef}>
            {messages?.length == 0 && (
              <div
                style={{
                  marginTop: "35%",
                  textAlign: "center",
                  color: "#00000070",
                }}
              >
                <p>
                  No conversation with <strong>{recipientUser?.name}</strong>{" "}
                  at!
                </p>
              </div>
            )}
            {messages.map((message: any, index: string) => (
              <div
                className={
                  message?.senderId == user._id
                    ? "right-msg-main"
                    : "left-msg-main"
                }
                key={index}
              >
                <div
                  className={
                    message?.senderId == user._id ? "right-msg" : "left-msg"
                  }
                >
                  <p className="m-0">{message?.text}</p>
                  <span
                    className={
                      message?.senderId == user._id
                        ? "message-footer-right pr-3"
                        : "message-footer-left pb-1"
                    }
                  >
                    {moment(message.createdAt).format("LT")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-box-footer">
          <div className="input-box-main">
            <input
              type="text"
              className="form-control input-box"
              placeholder="Write something..."
              onChange={(e) => {
                setTextMessage(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              value={textMessage}
            />

            <div
              className="send-btn-main"
              onClick={() => {
                if (textMessage.trim() !== "") {
                  sendTextMessage(
                    currentChat,
                    textMessage,
                    user,
                    setTextMessage
                  );
                } else {
                  toast.error("Message can't be empty!");
                }
              }}
            >
              <button type="button" className="send_btn">
                <SendIcon className="send-btn" />
              </button>
            </div>
          </div>
        </div>
      </Stack>
    </>
  );
}

export function Separatorr({ line }: { line: string }) {
  return (
    <div className="separator">
      <span className="text">{line}</span>
    </div>
  );
}
