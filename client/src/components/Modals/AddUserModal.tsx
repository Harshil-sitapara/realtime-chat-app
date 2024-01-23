import React, { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/auth.context";
import { userChatInterface } from "../../pages/Chat";
import { Button, TextField } from "@mui/material";
import { ConfigContext } from "../../context/config.context";
import { Logout, Tune } from "@mui/icons-material";
import { ChatContext } from "../../context/chat.context";
import { postRequest } from "../../utils/services";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface ProfileModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const AddUserModal: React.FC<ProfileModalProps> = ({ isOpen, handleClose }) => {
  const { user, logoutUser } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const { createChat, userChats } = useContext(ChatContext);
  const { isDarkMode } = useContext(ConfigContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Focus on the input when the modal opens
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleAddUserWithEmail = async () => {
    if (userEmail) {
      console.log("Email",userEmail)
      const response: any = await postRequest("/users/findByEmail",  {userEmail} );
      if (response?.error) {
        console.log("Error while finding user with email!", response?.error);
      }
      if (!response?.data.user) {
        toast.error("User not found");
        return;
      }
      if (user.email === userEmail) {
        toast.error(`Already logged in with ${userEmail}`);
        setUserEmail("");
        handleClose();
        return;
      }
      userChats?.forEach((chat: any) => {
        if (chat?.members.includes(response?.data.user._id)) {
          toast.error(`Already chat with ${response?.data.user.name}!`);
          setUserEmail("");
          return;
        }
      });
      if (userChats.member)
        await createChat(user?._id, response?.data.user._id);
      setUserEmail("");
      handleClose();
      console.log("Response with email", response?.data.user);
    } else {
      toast.error("Enter email!");
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div
          className="add-user-modal"
          style={{ background: isDarkMode ? "#2b2b2b" : "white" }}
        >
          <h3
            id="add-user-modal-title"
            style={{ color: isDarkMode ? "white" : "black" }}
          >
            Add User
          </h3>
          <input
            type="email"
            className="form-control mb-3"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter Email address"
            ref={inputRef}
          />
          <Button
            variant="contained"
            onClick={handleAddUserWithEmail}
            style={{ backgroundColor: "#4caf50", color: "white" }}
          >
            Add
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { AddUserModal };
