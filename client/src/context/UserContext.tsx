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
}

const defaultState = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultState);

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    if (!user) {
      axiosInstance
        .get<User>("/auth/user")
        .then(({ data }) => setUser(data))
        .catch((e) => console.log(e));
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
