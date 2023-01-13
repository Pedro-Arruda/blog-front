import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Home } from "./pages/home/Home.js";
import { Login } from "./pages/login/Login";

export const Router = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {user.usuarioId ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
