import { Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      style={{
        height: "3.75rem",
        fontFamily: "font-family: 'Mukta', sans-serif;",
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
            <Link to="/login" className="text-light text-decoration-none">
              Login
            </Link>
            <Link to="/register" className="text-light text-decoration-none">
              Register
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
