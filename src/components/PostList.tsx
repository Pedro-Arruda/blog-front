import { useNavigate } from "react-router-dom";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-6 justify-center xl:justify-start p-5">
      {posts && posts.length ? (
        posts.map(
          (post, index) =>
            post.active && (
              <PostCard
                post={post}
                key={index}
                onClickCard={() => navigate(`/posts/${post._id}`)}
              />
            )
        )
      ) : (
        <p>Nenhum post recente!</p>
      )}
    </div>
  );
};
