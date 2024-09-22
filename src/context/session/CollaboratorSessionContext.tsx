import { ProviderProps } from "@/ts/types/shared/ProviderProps.type";
import { createContext, useContext, useState } from "react";

interface SessionContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProvider = ({ children }: ProviderProps) => {
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [name, setName] = useState(localStorage.getItem("userName"));
  const [id, setId] = useState(
    localStorage.getItem("userId")
      ? Number(localStorage.getItem("userId"))
      : null
  );
  return (
    <SessionContext.Provider
      value={{ token, setToken, name, setName, id, setId }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("use Session must be inside a SessionProvider");
  }
  return context;
};
