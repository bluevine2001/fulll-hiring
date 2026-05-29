import type { GitHubUser } from "../types";
import UserCard from "./UserCard";

interface UserGridProps {
  users: GitHubUser[];
  selectedIds: Set<number>;
  onToggleSelect: (id: number) => void;
  emptyMessage: string;
}

const UserGrid = ({ users, selectedIds, onToggleSelect, emptyMessage }: UserGridProps) => {
  return (
    <div className="user-grid-scroll">
      <div className="user-grid">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isSelected={selectedIds.has(user.id)}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </div>
      {users.length === 0 && (
        <p style={{ textAlign: "center" }}>{emptyMessage}</p>
      )}
    </div>
  );
};

export default UserGrid;
