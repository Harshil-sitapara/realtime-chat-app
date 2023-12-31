import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BASE_API_URL, postRequest, user } from "../utils/services";
import { toast } from "react-toastify";

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext<any>(null);

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
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
    toast.success("Registration successful!", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    localStorage.setItem("User", JSON.stringify(response.data));
    setUser(response.data);
    return response;
  };

  const loginUser = async (url: string, body: user) => {
    setIsLoginLoading(true);
    setLoginError("");
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
    toast.success("Login successful!", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    localStorage.setItem("User", JSON.stringify(response.data));
    setUser(response.data);
    return response;
  };

  const logoutUser = () => {
    localStorage.removeItem("User");
    setUser(null);
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
