import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import { AuthContext } from "../../context/auth.context";
import { Button } from "@mui/material";
import { ConfigContext } from "../../context/config.context";
import { ChatContext } from "../../context/chat.context";
import { postRequest } from "../../utils/services";
import toast from "react-hot-toast";

interface ProfileModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const AddUserModal: React.FC<ProfileModalProps> = ({ isOpen, handleClose }) => {
  const { user } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState<string>("");
  const { createChat, userChats } = useContext(ChatContext);
  const { isDarkMode } = useContext(ConfigContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleAddUserWithEmail = async () => {
    if (!userEmail) {
      toast.error("Enter email!");
      return;
    }
    try {
      const response: any = await postRequest("/users/findByEmail", { userEmail });
      if (response?.data.user) {
        if (user?.email === userEmail) {
          toast.error(`Already logged in as ${userEmail}`);
          setUserEmail("")
        } else {
          const userAlreadyExists = userChats?.some((chat: any) => chat?.members.includes(response?.data.user._id));
          if (userAlreadyExists) {
            toast.error(`Already chat with ${response?.data.user.name}!`);
          } else {
            await createChat(user?._id, response?.data.user._id);
            toast.success("User added successfully!");
            setUserEmail("");
            handleClose();
          }
        }
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      console.error("Error while finding user with email!", error);
      toast.error("Error while finding user with email!");
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
            id="add-user-modal-title "
            style={{ color: isDarkMode ? "white" : "black", fontSize: '30px', fontWeight: "500" }}
          >
            Add User
          </h3>
          <input
            type="email"
            className="form-control my-3"
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

export { AddUserModal }
