import { useContext, useEffect, useState } from "react";
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
import logo from '../assets/logo1.png'
import lightLogo from '../assets/light-logo.png'
import textBg from '../assets/textBg.jpg'


const ITEM_HEIGHT = 48;

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
    <nav className={`h-16 mb-3 main-navbar ${isDarkMode ? 'bg-dark' : 'bg-[#F8FAFC]'}`} >
      <div className="max-w-7xl mx-auto px-4 backdrop-blur-sm flex justify-between items-center h-full">
        <h2 className="text-lg font-bold">
          <Link to="/app" className="text-white">
            <img className="mx-auto h-14 w-auto" src={isDarkMode ? lightLogo : logo} alt="Quick talk" />
          </Link>
        </h2>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <Notifications />
              <Tooltip title="Change mode (Dark/Light)" arrow>
                <button
                  className="text-white text-decoration-none flex items-center"
                  onClick={() => {
                    setIsDarkMode(!isDarkMode);
                    localStorage.setItem("isLightMode", isDarkMode);
                  }}
                >
                  {/* {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />} */}
                </button>
              </Tooltip>
              <Tooltip title={user?.name} arrow>
                <Avatar
                  alt={`${user.name} avatar`}
                  src={user?.profilePhoto?.url}
                  onClick={handleClick}
                  style={{ cursor: "pointer", backgroundColor: "white" }}
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
                  <div key={index}>
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
                  </div>
                ))}
              </Menu>
            </>
          )}
        </div>
      </div>
      <ProfileModal
        open={isProfileModalOpen}
        handleClose={handleCloseProfile}
        user={user}
      />
    </nav>
  );
}

export default NavbarComponent;
