import type { GitHubUser } from "../types";

interface UserCardProps {
  user: GitHubUser;
  isEditMode: boolean;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

const UserCard = ({
  user,
  isEditMode,
  isSelected,
  onToggleSelect,
}: UserCardProps) => {
  return (
    <div
      className={`user-card ${isEditMode && isSelected ? "user-card--selected" : ""}`}
    >
      {isEditMode && (
        <input
          type="checkbox"
          className="user-card-checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(user.id)}
        />
      )}

      <img
        src={user.avatar_url}
        alt={user.login}
        className="user-card-avatar"
      />

      <div className="user-card-login-container">
        <span className="user-card-id">{user.id}</span>
        <span className="user-card-login">{user.login}</span>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="user-card-btn"
      >
        View profile
      </a>
    </div>
  );
};

export default UserCard;
