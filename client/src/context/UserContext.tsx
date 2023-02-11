import { ReactElement, createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AxiosResponse } from "axios";

type Props = {
  children: ReactElement;
};

type User = {
  name: string;
  email: string;
  password: string;
};

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  ready: boolean;
}

const defaultState = {
  user: null,
  setUser: () => {},
  ready: false,
};

export const UserContext = createContext<UserContextType>(defaultState);

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<null | User>(null);
  const [ready, setIsReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axiosInstance
        .get<User>("/auth/user")
        .then(({ data }) => {
          setUser(data);
          setIsReady(true);
        })
        .catch((e) => console.log(e));
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
