import { createContext, useState } from "react";
import { IAuth } from "../models/auth.model";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth]: [IAuth, React.Dispatch<React.SetStateAction<IAuth>>] =
    useState({
      token: "",
    });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
