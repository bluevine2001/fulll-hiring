import { useState } from "react";
import type { GitHubUser } from "../types";

export function useUserList(sourceUsers: GitHubUser[]) {
  const [users, setUsers] = useState<GitHubUser[]>(sourceUsers);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [prevSource, setPrevSource] = useState(sourceUsers);

  if (prevSource !== sourceUsers) {
    setPrevSource(sourceUsers);
    setUsers(sourceUsers);
    setSelectedIds(new Set());
  }

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === users.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(users.map((u) => u.id)));
    }
  };

  const duplicateSelected = () => {
    const maxId = users.reduce((max, u) => Math.max(max, u.id), 0);
    const copies = users
      .filter((u) => selectedIds.has(u.id))
      .map((u, i) => ({ ...u, id: maxId + i + 1 }));
    setUsers((prev) => [...prev, ...copies]);
    setSelectedIds(new Set());
  };

  const deleteSelected = () => {
    setUsers((prev) => prev.filter((u) => !selectedIds.has(u.id)));
    setSelectedIds(new Set());
  };

  return {
    users,
    selectedIds,
    selectedCount: selectedIds.size,
    totalCount: users.length,
    toggleSelect,
    toggleSelectAll,
    duplicateSelected,
    deleteSelected,
  };
}
