import "./PostCard.css";
import React from "react";
import { data, Link } from "react-router";

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
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const userId = currentUser?._id;

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
            className={!userId ? "likes-disabled" : "submit-button"}
            disabled={!userId}
          >
            Likes: {likes.length}
          </button>
        </div>
      </footer>
    </div>
  );
};
