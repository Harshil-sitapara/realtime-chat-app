import { useContext } from "react";
import { Badge, Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ConfigContext } from "../context/config.context";
import Notifications from "./Notifications";

function NavbarComponent() {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Logout
    </Tooltip>
  );

  const { user, logoutUser } = useContext(AuthContext);
  const { isDarkMode, setIsDarkMode } = useContext(ConfigContext);
  const notificationCount = 5;

  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      style={{
        height: "3.75rem",
        fontFamily: "Mukta",
      }}
    >
      <Container>
        <h2 className="pt-1">
          <Link to="/" className="link-light text-decoration-none">
            <img src="" alt="" />
            QuikTalk
          </Link>
        </h2>
        {user && <h3 style={{ color: "white" }}>Hi {user?.name}!</h3>}
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
                <Notifications/>
                {/* Implement Dark mode functionality */}
                <div
                  className="text-light text-decoration-none d-flex align-items-center me-1 position-relative changeModeBtn"
                  onClick={() => {
                    setIsDarkMode(!isDarkMode);
                    localStorage.setItem("isLightMode", isDarkMode);
                  }}
                >
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </div>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <Link
                    to="/login"
                    className="text-light text-decoration-none d-flex align-items-center"
                    onClick={() => {
                      logoutUser();
                    }}
                  >
                    <span className="material-symbols-outlined logoutBtn">
                      logout
                    </span>
                  </Link>
                </OverlayTrigger>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
