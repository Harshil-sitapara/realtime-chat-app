import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/auth.context";
import { userChatInterface } from "../../pages/Chat";
import { Button } from "@mui/material";
import { ConfigContext } from "../../context/config.context";
import { Logout } from "@mui/icons-material";
import AvatarImage from '../../assets/profile.svg'

interface ProfileModalProps {
  open: boolean;
  handleClose: () => void;
  user: {
    _id: String;
    name: string;
    profilePhoto: Object;
    token: string;
    email: String;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, handleClose }) => {
  const { user, logoutUser } = useContext(AuthContext);
  const { isDarkMode } = useContext(ConfigContext);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: isDarkMode ? "#2b2b2b" : "white",
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Box sx={style}>
          <Avatar
            alt={user?.name}
            src={user?.profilePhoto?.url || AvatarImage}
            sx={{ width: 70, height: 70, mb: 2, border: "1px solid black" }}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
            color={isDarkMode ? "white" : ""}
          >
            {user?.name}
          </Typography>
          <Button
            onClick={() => {
              logoutUser();
              handleClose();
            }}
            style={{ color: isDarkMode ? "white" : "black" }}
          >
            <Logout fontSize="small" />
            Logout
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export { ProfileModal };
