import { makePostResume } from "../functions/makeResume";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post: cardPost }: PostCardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-[350px]">
      <img
        className="w-full h-[215px]"
        src={cardPost.imgCover}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{cardPost.title}</div>

        <p className="text-gray-700 text-base">
          {makePostResume(cardPost.content || "", 200)}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
};
