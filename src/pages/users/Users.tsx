import "./Users.css";
import { Link } from "react-router";

export const Users = () => {
  return (
    <>
      <h1>Users Page</h1>
      <Link to="/userDashboard">Go to User Dashboard</Link>
      <Link to="/">Back to Register</Link>
    </>
  );
};
