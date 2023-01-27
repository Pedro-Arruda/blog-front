import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { createFetchError } from "../functions/createFetchError";
import { parseError } from "../functions/parseError";
import imgNotFound from "../assets/image-not-found.png";
import { UserCircle } from "phosphor-react";
import { dateFormat } from "../functions/dateFormat";

import { marked } from "marked";

export const DetailsPost = () => {
  const [post, setPost] = useState<Post>();
  const params = useParams();

  const fetchPosts = async () => {
    try {
      const requestURL = `http://localhost:3001/post/id/${params.id}`;

      const response = await fetch(requestURL);

      if (response.status !== 200) {
        const error = await createFetchError(response);

        throw error;
      }

      const data = await response.json();
      setPost(data);
    } catch (err) {
      console.log(JSON.stringify(parseError(err), null, 2));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      {!post ? (
        <h1>Post nao encontrado</h1>
      ) : (
        <div className="mb-20">
          <div className="container mx-auto p-5">
            <img
              src={post.imgCover ? post.imgCover : imgNotFound}
              className="h-[300px] w-full lg:h-[600px]"
              alt=""
            />
            <div className="text-center flex flex-col gap-5 wrapper-class">
              <h1 className="text-5xl font-semibold mt-10 ">{post.title}</h1>

              <div>
                {post.tags.map((tag) => (
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-5 justify-center p-3">
                <p className="flex gap-2 items-center px-3 font-semibold">
                  <UserCircle size={22} weight="fill" color="#44403c" />{" "}
                  {post.author}
                </p>
                <p className="font-semibold">{dateFormat(post.createdAt)}</p>
              </div>

              <div className="flex justify-center">
                <div
                  className="w-[960px] text-left space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(post.content || ""),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
