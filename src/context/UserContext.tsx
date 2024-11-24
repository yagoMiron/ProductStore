import { createContext, ReactNode, useEffect, useState } from "react";

type UserType = {
  authTime: number;
  exp: number;
  name: string;
  email: string;
  photoURL: string;
  setAuthTime: (newState: number) => void;
  setExp: (newState: number) => void;
  setName: (newState: string) => void;
  setEmail: (newState: string) => void;
  setPhotoURL: (newState: string) => void;
  isSessionValid: () => boolean;
};

const initialValue: UserType = {
  authTime: localStorage.getItem("authTime")
    ? Number(localStorage.getItem("authTime"))
    : 0,
  exp: localStorage.getItem("exp") ? Number(localStorage.getItem("exp")) : 0,
  name: localStorage.getItem("name") || "",
  email: localStorage.getItem("email") || "",
  photoURL: localStorage.getItem("photoURL") || "",
  setAuthTime: () => {},
  setExp: () => {},
  setName: () => {},
  setEmail: () => {},
  setPhotoURL: () => {},
  isSessionValid: () => false,
};

export const UserContext = createContext(initialValue);

type UserContextProps = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [authTime, setAuthTime] = useState(initialValue.authTime);
  const [exp, setExp] = useState(initialValue.exp);
  const [name, setName] = useState(initialValue.name);
  const [email, setEmail] = useState(initialValue.email);
  const [photoURL, setPhotoURL] = useState(initialValue.photoURL);

  useEffect(() => {
    localStorage.setItem("authTime", `${authTime}`);
    localStorage.setItem("exp", `${exp}`);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("photoURL", photoURL);
  }, [authTime, exp, name, email, photoURL]);

  return (
    <UserContext.Provider
      value={{
        authTime,
        exp,
        name,
        email,
        photoURL,
        setAuthTime,
        setExp,
        setName,
        setEmail,
        setPhotoURL,
        isSessionValid: () => {
          const timestamp = new Date().getTime();
          const diff = exp - timestamp;
          return diff > 0;
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
