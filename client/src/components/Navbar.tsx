import { useContext, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ConfigContext } from "../context/config.context";
import Notifications from "./Notifications";
import Tooltip from "@mui/material/Tooltip";

import { Avatar, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Logout } from "@mui/icons-material";
import { ProfileModal } from "./Modals/ProfileModel";

function NavbarComponent() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isProfileModalOpen, isSetProfileModalOpen] = useState(false);

  const { user, logoutUser } = useContext(AuthContext);
  const { isDarkMode, setIsDarkMode } = useContext(ConfigContext);

  useEffect(() => {
    const isLight = localStorage.getItem("isLightMode");
    if (isLight == "false") {
      setIsDarkMode(!isDarkMode);
      localStorage.setItem("isLightMode", isDarkMode);
    }
  }, []);
  const options = ["View profile", "Logout"];
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 48;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenProfile = () => {
    isSetProfileModalOpen(true);
  };

  const handleCloseProfile = () => {
    isSetProfileModalOpen(false);
  };

  return (
    <Navbar
      expand="lg"
      bg={isDarkMode ? "dark" : "secondary"}
      data-bs-theme="dark"
      style={{
        height: "3.75rem",
        fontFamily: "Mukta",
      }}
    >
      <Container>
        <h2 className="pt-1">
          <Link to="/" className="link-light text-decoration-none">
            QuikTalk
          </Link>
        </h2>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {!user && (
              <>
                <Link to="/login" className="text-light text-decoration-none">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            )}
            {user && (
              <>
                <Notifications />
                <Tooltip title="Change mode (Dark/Light)" arrow>
                  <div
                    className="text-light text-decoration-none d-flex align-items-center me-1 position-relative changeModeBtn"
                    onClick={() => {
                      setIsDarkMode(!isDarkMode);
                      localStorage.setItem("isLightMode", isDarkMode);
                    }}
                  >
                    {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </div>
                </Tooltip>
                <Tooltip title={user?.name} arrow>
                  <Avatar
                    alt={`${user.name} avatar`}
                    src={user?.profilePhoto?.url}
                    onClick={handleClick}
                    style={{ cursor: "pointer", backgroundColor: "white" }}
                    title={user.name}
                  />
                </Tooltip>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                      right: 0,
                      left: "auto",
                      backgroundColor: isDarkMode ? "#2b2b2b" : "",
                      color: isDarkMode ? "white" : "",
                    },
                  }}
                >
                  {options?.map((option, index) => (
                    <>
                      {index > 0 && (
                        <Divider
                          style={{
                            backgroundColor: isDarkMode ? "#525252" : "",
                          }}
                        />
                      )}
                      <MenuItem
                        key={index}
                        onClick={() => {
                          handleClose();
                          if (option === "Logout") {
                            logoutUser();
                          } else if (option == "View profile") {
                            handleOpenProfile();
                          } else {
                            return null;
                          }
                        }}
                      >
                        {option === "View profile" ? (
                          <div>
                            <ListItemIcon
                              onClick={() => {
                                handleOpenProfile();
                              }}
                            >
                              <Avatar
                                alt={user.name}
                                src={user?.profilePhoto?.url}
                                style={{ width: 24, height: 24 }}
                              />
                            </ListItemIcon>
                            {/* {user.name} */}
                            Profile
                          </div>
                        ) : option === "Logout" ? (
                          <div>
                            <ListItemIcon
                              onClick={() => {
                                logoutUser();
                              }}
                            >
                              <Logout
                                fontSize="small"
                                style={{ color: isDarkMode ? "white" : "" }}
                              />
                            </ListItemIcon>
                            Logout
                          </div>
                        ) : (
                          option
                        )}
                      </MenuItem>
                    </>
                  ))}
                </Menu>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
      <ProfileModal
        open={isProfileModalOpen}
        handleClose={handleCloseProfile}
        user={user}
      />
    </Navbar>
  );
}

export default NavbarComponent;
