import { useNavigate } from "react-router-dom";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-10 justify-center lg:justify-start">
      {posts && posts.length ? (
        posts.map((post, index) => (
          <PostCard
            post={post}
            key={index}
            onClickCard={() => navigate(`/posts/${post._id}`)}
          />
        ))
      ) : (
        <p>Nenhum post recente!</p>
      )}
    </div>
  );
};
