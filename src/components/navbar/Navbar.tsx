import "./Navbar.css";
import UAILogo from "../../assets/UAI_logo.png";
import { Link } from "react-router";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={UAILogo} alt="logo_UAI" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/createPost">Create</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
};
