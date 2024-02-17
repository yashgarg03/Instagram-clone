import {
  useDeleteSavedPosts,
  useGetCurrentUser,
  useLikedPosts,
  useSavePosts,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes?.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { mutate: likePost } = useLikedPosts();
  const { mutate: savePost } = useSavePosts();
  const { mutate: deleteSavedPost } = useDeleteSavedPosts();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostrecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostrecord);
  }, [savedPostrecord]);

  console.log(currentUser);

  const handleLikedPost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id: string) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostrecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostrecord.$id);
    } else {
      setIsSaved(true);
      savePost({ postId: post.$id, userId });
    }
  };

  return (
    <div className="flex justify-between item-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`/assets/icons/${
            checkIsLiked(likes, userId) ? "liked" : "like"
          }.svg`}
          alt="like"
          height={20}
          width={20}
          onClick={handleLikedPost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes?.length}</p>
      </div>
      <div className="flex gap-2">
        <img
          src={`/assets/icons/${isSaved ? "saved" : "save"}.svg`}
          alt="like"
          height={20}
          width={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
