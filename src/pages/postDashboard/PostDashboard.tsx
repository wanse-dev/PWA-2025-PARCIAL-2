import "./PostDashboard.css";
import { Link } from "react-router";

export const PostDashboard = () => {
  return (
    <>
      <h1>Post Dashboard</h1>
      <Link to="/posts">Back to Posts</Link>
    </>
  );
};
