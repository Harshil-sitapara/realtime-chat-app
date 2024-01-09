import React, { useContext } from "react";
import { ChatContext } from "../../context/chat.context";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import { userChatInterface } from "../../pages/Chat";
import Profile from "../../assets/profile.svg";
import { useNavigate } from "react-router-dom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

interface PotentialChatProps {
  chat: userChatInterface;
  userInfo: any;
}

const PotentialChats: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, userChats,allUsers } = useContext(ChatContext);
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "18%",
          background: "rgb(209 209 209)",
          zIndex: 20,
          borderRadius: "8px",
        }}
      >
        {/* <h5
          style={{
            fontFamily: "Roboto",
            marginBottom: "0px",
            marginTop: "10px",
            paddingLeft:"8px",
          }}
        >
          People <PeopleAltOutlinedIcon />
        </h5> */}
        
        {userChats?.map((chat: any, index: number) => {
          return (
            <Stack
              key={index}
              direction="horizontal"
              className={`user-search-card align-items-center p-2 justify-content-between ${
                index === 0 ? "first-chat" : ""
              }`}
              role="button"
              onClick={() => {
                createChat(user._id, chat._id);
              }}
              gap={3}
            >
              <div className="d-flex">
                <div className="me-2 avatar-container">
                  <img src={Profile} alt="Avatar" height="35px" />
                  <div className="user-potential"></div>
                </div>
                <div className="text-content detail-container">
                  <div className="potential-name">{chat?.name}</div>
                  <div className="potential-text">Start chat</div>
                </div>
              </div>
            </Stack>
          );
        })}
      </div>
    </>
  );
};

export default PotentialChats;
