import SearchInput from "./components/SearchInput";
import Toolbar from "./components/Toolbar";
import UserGrid from "./components/UserGrid";
import { useUserList } from "./hooks/useUserList";
import "./style.css";

function App() {
  const {
    users,
    selectedIds,
    selectedCount,
    totalCount,
    toggleSelect,
    toggleSelectAll,
    duplicateSelected,
    deleteSelected,
  } = useUserList();

  return (
    <div>
      <div className="gh-search-container">
        <div className="gh-header">
          <p>Github Search</p>
        </div>
        <SearchInput />
        <Toolbar
          selectedCount={selectedCount}
          totalCount={totalCount}
          onToggleSelectAll={toggleSelectAll}
          onDuplicate={duplicateSelected}
          onDelete={deleteSelected}
        />
        <UserGrid
          users={users}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
        />
      </div>
    </div>
  );
}

export default App;
