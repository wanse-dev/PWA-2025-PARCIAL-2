import "./PostCard.css";
import React from "react";

type PostProps = {
  author: {
    _id: string;
    username: string;
    email: string;
  };
  title: string;
  content: string;
  likes: string[];
};

export const PostCard: React.FC<PostProps> = ({}) => {
  return <div className={"post-card"}></div>;
};
