import "./UserDashboard.css";
import { Link } from "react-router";

export const UserDashboard = () => {
  return (
    <>
      <h1>User Dashboard</h1>
      <Link to="/users">Back to Users</Link>
    </>
  );
};
