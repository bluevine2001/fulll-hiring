import type { GitHubUser } from "../types";

interface UserCardProps {
  user: GitHubUser;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

const UserCard = ({ user, isSelected, onToggleSelect }: UserCardProps) => {
  return (
    <div className={`user-card ${isSelected ? "user-card--selected" : ""}`}>
      <button
        className="user-card-checkbox"
        onClick={() => onToggleSelect(user.id)}
        aria-label={isSelected ? "Deselect user" : "Select user"}
        aria-pressed={isSelected}
      >
        {isSelected ? "☑" : "☐"}
      </button>

      <img src={user.avatar_url} alt={user.login} className="user-card-avatar" />

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
