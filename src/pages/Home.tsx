import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { PostList } from "../components/PostList";
import { Tabs } from "../components/tabs/Tabs";
import { createFetchError } from "../functions/createFetchError";
import { parseError } from "../functions/parseError";

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async (postTag?: string) => {
    try {
      const requestURL = `http://localhost:3001/post/${
        postTag?.toLowerCase() || ""
      }`;

      const response = await fetch(requestURL);

      if (response.status !== 200) {
        const error = await createFetchError(response);

        throw error;
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.log(JSON.stringify(parseError(err), null, 2));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-10 p-3 mb-10 dark">
      <Navbar />
      <h1 className="text-4xl font-bold">Últimos posts</h1>

      <Tabs
        items={[
          { label: "Todos", value: "" },
          { label: "React", value: "react" },
          { label: "JavaScript", value: "js" },
          { label: "Node", value: "node" },
          { label: "Front end", value: "frontend" },
          { label: "Back end", value: "backend" },
        ]}
        defaultTab=""
        onChangeTab={fetchPosts}
      />
      <PostList posts={posts} />
    </div>
  );
};
