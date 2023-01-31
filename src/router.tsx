import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { NewPost } from "./pages/NewPost";
import { DetailsPost } from "./pages/DetailsPost";
import { MyPosts } from "./pages/MyPosts";
import { EditPost } from "./pages/EditPost";

export const Router = () => {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {!auth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<DetailsPost />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/my-posts/" element={<MyPosts />} />
            <Route path="/posts/:id" element={<DetailsPost />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
