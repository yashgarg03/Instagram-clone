import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import React from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id);
  const { user } = useUserContext();
  const { mutate: deletePost, isLoading: isDeleting } = useDeletePost();
  console.log(post);
  const handleDeletePost = () => {
    deletePost(post?.$id, post?.imageId);
  };

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator?.$id}`}
                className="flex gap-4"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/images/default-profile.jpg"
                  }
                  alt="profile"
                  className="rounded-full w-12 lg:h-12"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator?.name}
                  </p>
                  <div className="flex gap-2 text-zinc-500">
                    <p>{multiFormatDateString(post?.$createdAt)}</p> -{" "}
                    <p>{post?.location}</p>
                  </div>
                </div>
              </Link>
              <div className="flex-center gap-4">
                {post?.creator.$id == user.id && (
                  <>
                    <Link to={`/update-post/${post?.$id}`}>
                      <img
                        src="/assets/icons/edit.svg"
                        alt="edit"
                        width={25}
                        height={25}
                      />
                    </Link>
                    <Button
                      onClick={handleDeletePost}
                      variant="destructive"
                      className=""
                    >
                      <img
                        className="cursor-pointer"
                        src="/assets/icons/delete.svg"
                        alt="delete"
                        width={25}
                        height={25}
                      />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <hr className="w-full border border-dark-4/80" />

            <div className="small-medium lg:base-medium">
              <p>{post?.caption}</p>
              <ul className="flex flex-1 mt-2">
                {post?.tags?.map((tag: string) => {
                  return (
                    <li className="text-zinc-500" key={tag}>
                      #{tag + " "}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
