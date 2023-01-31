import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { createFetchError } from "../functions/createFetchError";
import { parseError } from "../functions/parseError";
import { Table } from "../components/Table";
import { dateFormat } from "../functions/dateFormat";
import { ArrowCircleUpRight, Pen } from "phosphor-react";
import { makePostResume } from "../functions/makeResume";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PostTags } from "../components/PostTags";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";

export const MyPosts = () => {
  const { auth } = useAuth();
  const [postsAuthor, setPostsAuthor] = useState<Post[]>([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const requestURL = "http://localhost:3001/post";

      const response = await fetch(requestURL);

      if (response.status !== 200) {
        const error = await createFetchError(response);

        throw error;
      }

      const data = await response.json();
      setPostsAuthor(
        data.filter((post: Post) => post.author === auth?.user.name)
      );
    } catch (err) {
      console.log(JSON.stringify(parseError(err), null, 2));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-10">
      <Navbar />

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Meus posts</h1>
        <Button onClick={() => navigate("/new-post")}>Novo post</Button>
      </div>

      <Table
        columns={[
          {
            label: "Título",
            key: "title",
            render: (post) => (
              <p className={post.active ? "opacity-100" : "opacity-60"}>
                {post.title}
              </p>
            ),
          },
          {
            label: "Data",
            key: "createdAt",
            render: (post) => (
              <p className={post.active ? "opacity-100" : "opacity-40"}>
                {dateFormat(post.createdAt)}
              </p>
            ),
          },

          {
            label: "Tags",
            key: "tags",
            render: (post) => (
              <PostTags
                tags={post.tags}
                className={post.active ? "opacity-100" : "opacity-40"}
              />
            ),
          },
          {
            label: "Conteúdo",
            key: "content",
            render: (post) => (
              <p className={post.active ? "opacity-100" : "opacity-40"}>
                {makePostResume(post.content, 80)}...
              </p>
            ),
          },
          {
            label: "Ativo",
            key: "active",
            render: (post) => (
              <Badge
                content={post.active ? "SIM" : "NÃO"}
                bgColor={post.active ? "bg-green-400" : "bg-red-400"}
              />
            ),
          },
          {
            label: "Opções",
            key: "opcoes",
            render: (post) => (
              <div className="flex justify-center gap-3">
                <Pen
                  size={24}
                  color="#44403c"
                  className="cursor-pointer"
                  onClick={() => navigate(`/posts/edit/${post._id}`)}
                />

                <ArrowCircleUpRight
                  size={24}
                  color="#44403c"
                  className="cursor-pointer"
                  onClick={() => navigate(`/posts/${post._id}`)}
                />
              </div>
            ),
          },
        ]}
        items={postsAuthor}
      />
    </div>
  );
};
