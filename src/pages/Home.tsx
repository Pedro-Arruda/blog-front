import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import { Tabs } from "../components/tabs/Tabs";
import { createFetchError } from "../functions/createFetchError";
import { parseError } from "../functions/parseError";

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/post");

      if (response.status !== 200) {
        const error = await createFetchError(response);

        throw error;
      }

      const data = await response.json();
      console.log(data);
      navigate("/");
    } catch (err) {
      console.log(JSON.stringify(parseError(err), null, 2));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container  mx-auto flex flex-col gap-10">
      <Navbar />
      <h1 className="text-4xl font-bold">Últimos posts</h1>

      <Tabs labels={["Todos", "React", "Javascript", "Node"]}>
        <div className="flex flex-wrap gap-10 ">
          {posts ? (
            posts.map((post, index) => <PostCard post={post} key={index} />)
          ) : (
            <p>Nenhum post recente!</p>
          )}
        </div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
      </Tabs>
    </div>
  );
};
