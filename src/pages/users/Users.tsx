import "./Users.css";
import enable from "../../assets/enable.png";
import disable from "../../assets/disable.png";
import { UserCard } from "../../components/userCard/UserCard";
import { UserCardLoader } from "../../components/userCard/loader/UserCardLoader";
import { PageTitle } from "../../components/pageTitle/PageTitle";
import axiosInstance from "../../config/axios";
import { getStoredUser } from "../../config/user";
import { setStoredUser } from "../../config/user";
import { removeStoredUser } from "../../config/user";
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
      const response = await axiosInstance.get(
        "http://localhost:3000/api/users"
      );
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

  const enableUser = async (userId: string) => {
    try {
      const response = await axiosInstance.patch(
        `http://localhost:3000/api/users/enable/${userId}`
      );
      setData((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isActive: true } : user
        )
      );
      setStoredUser(response.data.data);
      console.log("User stored and activated:", response.data.data);
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  const disableUser = async (userId: string) => {
    try {
      await axiosInstance.patch(
        `http://localhost:3000/api/users/disable/${userId}`
      );
      setData((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isActive: false } : user
        )
      );

      const user = getStoredUser();
      if (user) {
        if (user._id === userId) {
          removeStoredUser("user");
          console.log("User deactivated and removed from localStorage");
        }
      }
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
  };

  return (
    <section className="users">
      <PageTitle title="User Directory" subtitle="Manage all users" />
      <div className="users-list">
        {loading && (
          <>
            <UserCardLoader />
            <UserCardLoader />
            <UserCardLoader />
            <UserCardLoader />
            <UserCardLoader />
            <UserCardLoader />
          </>
        )}
        {error && (
          <p>
            {error.name}: {error.message}
          </p>
        )}
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
