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
import { getAuth, logoutUser } from "../service/authService";

interface userProps {
  email: string;
  role: string;
  userId: string;
  username: string;
}

interface authProps {
  data: userProps;
  message: string;
  ok: boolean;
}

interface IUserContext {
  currentUser: authProps | null; // Define your currentUser type here
  loading: boolean;
  setCurrentUser: Dispatch<SetStateAction<authProps | null>>; // Define the type of setCurrentUser
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
  const [currentUser, setCurrentUser] = useState<authProps | null>(null);
  const [loading, setLoading] = useState(true);
  const value = { currentUser, loading, setCurrentUser };
  const navigate = useNavigate();

  const fetchAuthStatus = async () => {
    try {
      const userAuth = await getAuth();
      if (!userAuth) {
        logoutUser();
        setCurrentUser(null);
      } else {
        const userInfo = userAuth as authProps;
        setCurrentUser(userInfo);
      }
    } catch (error) {
      logoutUser();
      setCurrentUser(null);
      console.error("Error while fetching authentication status:", error);
    }
    setLoading(false);
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
