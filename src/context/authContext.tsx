import { createContext, PropsWithChildren, useEffect, useState } from "react";

export interface UserProps {
  email: string;
  nome: string;
  usuarioId: number | null;
}

export interface AuthContextProps {
  user: UserProps;
  setUser: (user: UserProps) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: {
    email: "",
    nome: "",
    usuarioId: null,
  },
  setUser: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserProps>({
    email: "",
    nome: "",
    usuarioId: null,
  });

  const LOCAL_STORAGE_KEY = "usuario-auth";

  const setAuth = (user: any) => {
    if (!user) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    }

    setUser(user);
  };

  const fetchAuth = () => {
    try {
      const authStr = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!authStr) {
        setUser({
          email: "",
          nome: "",
          usuarioId: null,
        });
        return;
      }

      try {
        const value = JSON.parse(authStr);

        setAuth({
          refreshToken: value.refreshToken,
          accessToken: value.accessToken,
          expiresAt: value.expiresAt,
        });
      } catch (err) {
        console.log(err);
        setUser({
          email: "",
          nome: "",
          usuarioId: null,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
