import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "./components/UsersList";
import { UserCreate } from "./components/UserCreate";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./pages/login/Login";

export const Router = () => {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {!auth ? (
          <Route path="/" element={<Login />} />
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
