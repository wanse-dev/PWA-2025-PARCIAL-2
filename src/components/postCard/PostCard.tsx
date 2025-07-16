import "./PostCard.css";
import React, { useState } from "react";
import { Link } from "react-router";
import axiosInstance from "../../config/axios";
import { getStoredUser } from "../../config/user";

type PostProps = {
  _id?: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  title: string;
  content: string;
  likes: string[];
  edited: boolean;
};

export const PostCard: React.FC<PostProps> = ({
  _id,
  author,
  title,
  content,
  likes,
  edited,
}) => {
  const user = getStoredUser();
  const userId = user?._id;

  const [localLikes, setLocalLikes] = useState<string[]>(likes);

  const alreadyLiked = userId && localLikes.includes(userId);

  const handleLike = async () => {
    if (!userId || !_id) return;

    try {
      const response = await axiosInstance.patch(`/posts/like/${_id}`, {
        userId,
      });

      const updatedLikes = response.data.data.likes;
      setLocalLikes(updatedLikes);
    } catch (error) {
      console.debug("Error toggling like: ", error);
    }
  };

  return (
    <div className="post-card">
      <header className="post-title">
        <Link to={`/post-dashboard/${_id}`}>
          <strong>{title}</strong>
        </Link>
      </header>
      <main className="post-content">{content}</main>
      <footer className="post-footer">
        <div className="post-author">
          By: <strong>{author.username}</strong>{" "}
          <i>{edited ? ` (edited)` : ""}</i>
        </div>
        <div className="post-likes">
          <button
            onClick={handleLike}
            className={
              !user
                ? "likes-disabled"
                : alreadyLiked
                ? "submit-button liked"
                : "submit-button"
            }
            disabled={!user}
          >
            {alreadyLiked ? "Unlike" : "Like"} ({localLikes.length})
          </button>
        </div>
      </footer>
    </div>
  );
};
