import type { GitHubUser } from "../types";
import UserCard from "./UserCard";

interface UserGridProps {
  users: GitHubUser[];
  isEditMode: boolean;
  selectedIds: Set<number>;
  onToggleSelect: (id: number) => void;
  emptyMessage: string;
}

const UserGrid = ({
  users,
  isEditMode,
  selectedIds,
  onToggleSelect,
  emptyMessage,
}: UserGridProps) => {
  return (
    <div className="user-grid-scroll">
      <div className="user-grid">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isEditMode={isEditMode}
            isSelected={selectedIds.has(user.id)}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </div>
      {users.length === 0 && (
        <p className="user-grid-empty-message">{emptyMessage}</p>
      )}
    </div>
  );
};

export default UserGrid;
