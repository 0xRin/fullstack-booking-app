import { ReactElement, createContext, useEffect, useState } from "react";

type Props = {
  children: ReactElement;
};

interface ToasterContext {
  isSuccess: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const contextValues = {
  isSuccess: false,
  setSuccess: () => {},
};

export const ToasterContext = createContext<ToasterContext>(contextValues);

export const ToasterContextProvider = ({ children }: Props) => {
  const [isSuccess, setSuccess] = useState<boolean>(false);

  return (
    <ToasterContext.Provider value={{ isSuccess, setSuccess }}>
      {children}
    </ToasterContext.Provider>
  );
};
