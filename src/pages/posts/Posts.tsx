import "./Posts.css";
import { useState } from "react";
import { PageTitle } from "../../components/pageTitle/PageTitle";

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
};

export const Posts = () => {
  const [data, setData] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
        <div className="user-card-container"></div>
      </div>
    </section>
  );
};
