import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BASE_API_URL, postRequest, user } from "../utils/services";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext<any>(null);

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    profilePhoto: "",
  });
  // Login
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateRegisterInfo = useCallback((info: any) => {
    setRegisterInfo(info);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user !== null) {
      setUser(JSON.parse(user));
    }
  }, []);

  const registerUser = async (url: string, body: user) => {
    setIsRegisterLoading(true);
    setRegisterError("");
    try {
      const response: any = await postRequest(url, body);
      if (response?.error) {
        setTimeout(() => {
          setIsRegisterLoading(false);
        }, 300);
        return setRegisterError(response.error);
      }
      setTimeout(() => {
        setIsRegisterLoading(false);
      }, 300);
      if (response) {
        toast.success("Registration successful!")
      }
      localStorage.setItem("User", JSON.stringify(response.data));
      setUser(response.data);
      return response;
    } catch (error) {
      console.log("Error while register", error);
      setRegisterError(error as string);
      toast.error("Something went wrong!")
    }
  };

  const loginUser = async (url: string, body: user) => {
    setIsLoginLoading(true);
    setLoginError("");
    try {
      const response: any = await postRequest(url, body);
      if (response?.error) {
        setTimeout(() => {
          setIsLoginLoading(false);
        }, 300);
        return setLoginError(response.error);
      }
      setTimeout(() => {
        setIsLoginLoading(false);
      }, 300);
      if (response) {
        toast.success("Login successful!")
      }
      localStorage.setItem("User", JSON.stringify(response.data));
      setUser(response.data);
      return response;
    } catch (error) {
      console.log("Error while register", error);
      setLoginError(error as string);
      toast.error("Something went wrong!")
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("User");
    localStorage.setItem("isLightMode","true");
    setUser(null);
    document.body.style.backgroundColor = "";
    const rootElement = document?.getElementById("root");
    if (rootElement) {
      rootElement.style.backgroundColor = "";
    }
    navigate('/login')
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerError,
        isRegisterLoading,
        registerUser,
        logoutUser,
        loginInfo,
        setLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
