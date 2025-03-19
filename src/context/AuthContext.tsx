import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../services/api";
import { useGlobalContext } from "./GlobalState";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser } = useGlobalContext();
  const hasFetchedUser = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !hasFetchedUser.current) {
      setIsAuthenticated(true);
      fetchUserData(token).then((user) => {
        setUser(user);
        hasFetchedUser.current = true;
      });
    }
  }, [setUser]);

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    fetchUserData(token).then((user) => setUser(user));
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
