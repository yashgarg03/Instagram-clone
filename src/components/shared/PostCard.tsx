import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user }: any = useUserContext();
  if (!post) return;
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator?.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/images/default-profile.jpg"
              }
              alt="profile"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator?.name}
            </p>
            <div className="flex gap-2 text-zinc-500">
              <p>{multiFormatDateString(post.$createdAt)}</p> -{" "}
              <p>{post.location}</p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id != post.creator?.$id && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>
      <div className="small-medium lg:base-medium py-5">
        <p>{post.caption}</p>
        <ul className="flex flex-1 mt-2">
          {post.tags?.map((tag: string) => {
            return (
              <li className="text-zinc-500" key={tag}>
                #{tag + " "}
              </li>
            );
          })}
        </ul>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>

      <PostStats post={post} userId={user.id}/>
    </div>
  );
};

export default PostCard;
