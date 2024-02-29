/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus, logoutUser } from "../service/authService";

interface userProps {
  username: string;
  email: string;
}

interface IUserContext {
  currentUser: userProps | null; // Define your currentUser type here
  loading: boolean;
  setCurrentUser: Dispatch<SetStateAction<userProps | null>>; // Define the type of setCurrentUser
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  loading: true,
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const value = { currentUser, loading, setCurrentUser };
  const navigate = useNavigate();

  const fetchAuthStatus = async () => {
    try {
      const isAuthenticated = await checkAuthStatus();
      if (!isAuthenticated) {
        logoutUser();
        setCurrentUser(null);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching authentication status:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unlisten = () => {
      fetchAuthStatus();
    };

    return () => {
      unlisten();
    };
  }, [navigate]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
