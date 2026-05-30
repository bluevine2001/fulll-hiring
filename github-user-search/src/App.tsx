import { useState } from "react";
import SearchInput from "./components/SearchInput";
import Toolbar from "./components/Toolbar";
import UserGrid from "./components/UserGrid";
import { useGithubSearch } from "./hooks/useGithubSearch";
import { useUserList } from "./hooks/useUserList";
import "./style.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error } = useGithubSearch(searchQuery);

  const {
    users,
    selectedIds,
    selectedCount,
    totalCount,
    editMode,
    toggleSelect,
    toggleSelectAll,
    toggleEditMode,
    duplicateSelected,
    deleteSelected,
  } = useUserList(data);

  return (
    <div className="gh-search-container">
      <div className="gh-header">
        <p>Github Search</p>
      </div>
      <SearchInput query={searchQuery} onChangeQuery={setSearchQuery} />
      {loading && <p>loading ...</p>}
      {error === "rate_limit" && (
        <p>You have reached the API's Limitation, please retry in a minute.</p>
      )}
      {error === "network" && <p>An error occured.</p>}

      {users.length > 0 && (
        <Toolbar
          selectedCount={selectedCount}
          totalCount={totalCount}
          onToggleSelectAll={toggleSelectAll}
          onDuplicate={duplicateSelected}
          onDelete={deleteSelected}
          isEditMode={editMode}
          onEditModeChange={toggleEditMode}
        />
      )}
      <UserGrid
        users={users}
        isEditMode={editMode}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        emptyMessage={
          searchQuery.trim() ? "No users found." : "Search for GitHub users..."
        }
      />
    </div>
  );
}

export default App;
