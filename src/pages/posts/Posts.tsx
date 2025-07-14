import "./Posts.css";
import { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import { PageTitle } from "../../components/pageTitle/PageTitle";
import { PostCard } from "../../components/postCard/PostCard";

type PostProps = {
  _id?: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  title: string;
  content: string;
  likes: string[];
  edited: boolean;
};

export const Posts = () => {
  const [data, setData] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/api/posts");
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

  return (
    <section className="posts">
      <PageTitle title="Posts" subtitle="See all posts from every user" />
      <div className="posts-list">
        {loading && <p>Loading...</p>}
        {error && (
          <p>
            {error.name}: {error.message}
          </p>
        )}
        {data.map((item) => {
          const id = item._id;
          return (
            <div key={id} className="post-card-container">
              <PostCard
                _id={item._id}
                author={item.author}
                title={item.title}
                content={item.content}
                likes={item.likes}
                edited={item.edited}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
