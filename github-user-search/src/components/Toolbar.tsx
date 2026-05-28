import { useEffect, useRef } from "react";

interface ToolbarProps {
  selectedCount: number;
  totalCount: number;
  onToggleSelectAll: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const Toolbar = ({ selectedCount, totalCount, onToggleSelectAll, onDuplicate, onDelete }: ToolbarProps) => {
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
      <label className="toolbar-select-all">
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={allSelected}
          onChange={onToggleSelectAll}
          aria-label="Select all"
        />
        <span className="toolbar-selected-label">{selectedCount} elements selected</span>
      </label>

      {selectedCount > 0 && (
        <div className="toolbar-actions">
          <button className="toolbar-action-btn toolbar-action-btn--duplicate" onClick={onDuplicate}>
            Duplicate
          </button>
          <button className="toolbar-action-btn toolbar-action-btn--delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
