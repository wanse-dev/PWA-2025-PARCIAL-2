import "./CreatePost.css";
import { Link } from "react-router";

export const CreatePost = () => {
  return (
    <>
      <h1>Create Post Page</h1>
      <Link to="/posts">Back to Posts</Link>
    </>
  );
};
