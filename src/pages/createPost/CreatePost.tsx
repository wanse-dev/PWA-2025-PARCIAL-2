import "./CreatePost.css";
import { Link } from "react-router";

export const CreatePost = () => {
  return (
    <section className="create-post">
      <h1>Create Post Page</h1>
      <Link to="/posts">Back to Posts</Link>
    </section>
  );
};
