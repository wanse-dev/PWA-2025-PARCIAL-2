import "./Users.css";
import enable from "../../assets/enable.png";
import disable from "../../assets/disable.png";
import { UserCard } from "../../components/userCard/UserCard";
import { PageTitle } from "../../components/pageTitle/PageTitle";
import axios from "axios";
import { useState, useEffect } from "react";

type UserProps = {
  _id?: string;
  username: string;
  email: string;
  isActive: boolean;
};

export const Users = () => {
  const [data, setData] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setData(response.data.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Unknown error"));
      }
    } finally {
      setLoading(false);
      console.log("Data fetched successfully.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const endpoint = isActive
        ? `http://localhost:3000/api/users/enable/${userId}`
        : `http://localhost:3000/api/users/disable/${userId}`;
      await axios.patch(endpoint);
      setData((prev) =>
        prev.map((user) => (user._id === userId ? { ...user, isActive } : user))
      );
      console.log(
        `User ${userId} status updated to ${isActive ? "active" : "inactive"}.`
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        console.error("Error updating user status:", error.message);
      } else {
        setError(new Error("Failed to update user status"));
        console.error("Error updating user status: Unknown error");
      }
    }
  };

  const enableUser = (userId: string) => {
    updateUserStatus(userId, true);
  };

  const disableUser = (userId: string) => {
    updateUserStatus(userId, false);
  };

  return (
    <section className="users">
      <PageTitle
        title="User Directory"
        subtitle="Manage all registered users"
      />
      <div className="users-list">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data.map((item) => {
          const id = item._id || item.email;
          const isDisabled = !item.isActive;
          return (
            <div key={id} className="user-card-container">
              <UserCard
                username={item.username}
                email={item.email}
                isActive={item.isActive}
              />
              <div className="user-card-actions">
                <button
                  onClick={() => enableUser(id)}
                  disabled={!isDisabled}
                  className={!isDisabled ? "user-disabled" : ""}
                >
                  <img src={enable} alt="Enable User" draggable="false" />
                </button>
                <button
                  onClick={() => disableUser(id)}
                  disabled={isDisabled}
                  className={isDisabled ? "user-disabled" : ""}
                >
                  <img src={disable} alt="Disable User" draggable="false" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
