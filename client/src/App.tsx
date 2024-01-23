import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth.context";
import { ToastContainer } from "react-toastify";
import { ChatContextProvider } from "./context/chat.context";
import { ConfigContext, ConfigContextProvider } from "./context/config.context";
import{ Toaster } from "react-hot-toast";

import AOS from 'aos'
import 'aos/dist/aos.css';

export default function App() {
  const { user } = useContext(AuthContext);
  useEffect(()=>{
    AOS.init()
  },[])

  return (
    <>
      <ConfigContextProvider>
        <ChatContextProvider currentUser={user}>
          <NavbarComponent />
          <Container>
            <Routes>
              <Route path="/" element={user ? <Chat /> : <Login />} />
              <Route
                path="/register"
                element={user ? <Chat /> : <Register />}
              />
              <Route path="/login" element={user ? <Chat /> : <Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
          <ToastContainer />
          <Toaster/>
        </ChatContextProvider>
      </ConfigContextProvider>
    </>
  );
}
