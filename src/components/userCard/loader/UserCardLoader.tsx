import "./UserCardLoader.css";

export const UserCardLoader = () => {
  return (
    <div className="user-card-container loader">
      <div className="user-card">
        <div className="skeleton shimmer line"></div>
        <div className="skeleton shimmer line short"></div>
      </div>
      <div className="user-card-actions">
        <div className="skeleton shimmer action-button top"></div>
        <div className="skeleton shimmer action-button bottom"></div>
      </div>
    </div>
  );
};
