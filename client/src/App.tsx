import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/Navbar";
import Header from "./components/Header.tsx";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth.context";
import { ToastContainer } from "react-toastify";
import { ChatContextProvider } from "./context/chat.context";
import { ConfigContext, ConfigContextProvider } from "./context/config.context";
import { Toaster } from "react-hot-toast";

import AOS from 'aos'
import 'aos/dist/aos.css';
import Landing from "./pages/Landing/index.tsx";

export default function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <>
      {window?.location.pathname === '/' ?
        <ConfigContextProvider>
          <ChatContextProvider currentUser={user}>
            <Header />
            <Routes>
              <Route path="/" element={<Landing />} />
            </Routes>
          </ChatContextProvider>
        </ConfigContextProvider>
        :
        <ConfigContextProvider>
          <ChatContextProvider currentUser={user}>
            <Routes>
              <Route path="/app" element={user ? <Chat /> : <Login />} />
              <Route
                path="/register"
                element={user ? <Chat /> : <Register />}
              />
              <Route path="/login" element={user ? <Chat /> : <Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <ToastContainer />
            <Toaster />
          </ChatContextProvider>
        </ConfigContextProvider>}

    </>
  );
}
