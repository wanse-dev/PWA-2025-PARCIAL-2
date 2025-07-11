import "./Users.css";
import enable from "../../assets/enable.png";
import disable from "../../assets/disable.png";
import { Link } from "react-router";
import { UserCard } from "../../components/userCard/UserCard";
import axios from "axios";
import { useState, useEffect } from "react";

type UserProps = {
  _id?: string;
  username: string;
  email: string;
};

export const Users = () => {
  const [data, setData] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setData(response.data.data);
      console.log(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="users">
      <h1>Users Page</h1>
      <div className="users-list">
        {data &&
          data.map((item: UserProps) => (
            <div key={item._id || item.email} className="user-card-container">
              <UserCard username={item.username} email={item.email} />
              <div className="user-card-actions">
                <button>
                  <img src={enable} alt="Enable User" draggable="false" />
                </button>
                <button>
                  <img src={disable} alt="Disable User" draggable="false" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
