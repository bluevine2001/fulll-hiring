import { useEffect, useRef } from "react";
import Toggle from "./Toggle";

interface ToolbarProps {
  selectedCount: number;
  totalCount: number;
  onToggleSelectAll: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  isEditMode: boolean;
  onEditModeChange: () => void;
}

const Toolbar = ({
  selectedCount,
  totalCount,
  onToggleSelectAll,
  onDuplicate,
  onDelete,
  isEditMode,
  onEditModeChange,
}: ToolbarProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const allSelected = totalCount > 0 && selectedCount === totalCount;
  const someSelected = selectedCount > 0 && selectedCount < totalCount;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  return (
    <div className="toolbar">
      {isEditMode && (
        <label className="toolbar-select-all">
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={allSelected}
            onChange={onToggleSelectAll}
            aria-label="Select all"
          />
          <span className="toolbar-selected-label">
            {selectedCount} elements selected
          </span>
        </label>
      )}

      <div className="toolbar-actions">
        {isEditMode && selectedCount > 0 && (
          <>
            <button
              className="toolbar-action-btn toolbar-action-btn--duplicate"
              onClick={onDuplicate}
            >
              Duplicate
            </button>
            <button
              className="toolbar-action-btn toolbar-action-btn--delete"
              onClick={onDelete}
            >
              Delete
            </button>
          </>
        )}
        <Toggle
          checked={isEditMode}
          onChange={onEditModeChange}
          label="Edit"
          id="edit-mode-toggle"
        />
      </div>
    </div>
  );
};

export default Toolbar;
