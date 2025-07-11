import "./Register.css";
import { Link } from "react-router";

export const Register = () => {
  return (
    <>
      <h1>Register Page</h1>
      <Link to="/posts">Create User</Link>
    </>
  );
};
