import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./pages/Login";
import { UserList } from "./pages/UsersList";
import { UserCreate } from "./pages/UserCreate";
import { Register } from "./pages/Register";

export const Router = () => {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {!auth ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/" element={<UserList />} />
            <Route path="/create-user" element={<UserCreate />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
