import "./PostCardLoader.css";

export const PostCardLoader = () => {
  return (
    <div className="post-card post-card-loader">
      <header className="post-title">
        <div className="skeleton shimmer title"></div>
      </header>
      <main className="post-content">
        <div className="skeleton shimmer line"></div>
        <div className="skeleton shimmer line short"></div>
        <div className="skeleton shimmer line"></div>
      </main>
      <footer className="post-footer">
        <div className="post-author">
          <div className="skeleton shimmer author"></div>
        </div>
        <div className="post-likes">
          <div className="skeleton shimmer button"></div>
        </div>
      </footer>
    </div>
  );
};
