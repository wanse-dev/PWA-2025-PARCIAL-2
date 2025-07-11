import "./Posts.css";
import { Link } from "react-router";

export const Posts = () => {
  return (
    <section className="posts">
      <h1>Posts Page</h1>
      <Link to="/postDashboard">Go to Post Dashboard</Link>
      <Link to="/">Go back to Register</Link>
    </section>
  );
};
