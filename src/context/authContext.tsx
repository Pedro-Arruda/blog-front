import { createContext, PropsWithChildren, useEffect, useState } from "react";

export interface AuthProps {
  email: string;
  name: string;
  _id: number | null;
}

export interface AuthContextData {
  auth: AuthProps | null;
  updateAuth: (auth: AuthProps | null) => void;
}

export const AuthContext = createContext<AuthContextData>({
  auth: null,
  updateAuth: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthProps | null>(null);

  const LOCAL_STORAGE_KEY = "usuario-auth";

  const updateAuth = (auth: AuthProps | null) => {
    if (!auth) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(auth));
    }

    setAuth(auth);
  };

  const fetchAuthData = () => {
    try {
      const authStr = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!authStr) {
        updateAuth(null);
        return;
      }

      const value = JSON.parse(authStr);

      if (value && value.email && value.nome && value.usuarioId) {
        updateAuth({
          email: value.email,
          name: value.name,
          _id: value._id,
        });
      } else {
        updateAuth(null);
      }
    } catch (err) {
      console.error(err);
      updateAuth(null);
    }
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        updateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
