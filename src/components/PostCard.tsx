import { UserCircle } from "phosphor-react";
import { dateFormat } from "../functions/dateFormat";
import { makePostResume } from "../functions/makeResume";
import imgNotFound from "../assets/image-not-found.png";

interface PostCardProps {
  post: Post;
  onClickCard: () => void;
}

export const PostCard = ({ post, onClickCard }: PostCardProps) => {
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg w-[350px]"
      onClick={onClickCard}
    >
      <img
        className="w-full h-[215px]"
        src={post.imgCover ? post.imgCover : imgNotFound}
        alt="Sunset in the mountains"
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>

        <p className="text-gray-700 text-base">
          {makePostResume(post.content || "", 200)}
        </p>
      </div>

      <div className="flex gap-2 justify-between p-3">
        <p className="flex gap-2 px-3 font-semibold">
          <UserCircle size={22} weight="fill" color="#44403c" /> {post.author}
        </p>
        <p className="font-semibold">{dateFormat(post.createdAt)}</p>
      </div>

      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <div>
          {post.tags.map((tag) => (
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
