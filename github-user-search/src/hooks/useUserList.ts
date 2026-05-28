import { useState } from "react";
import type { GitHubUser } from "../types";

const INITIAL_USERS: GitHubUser[] = [
  { id: 1, login: "mojombo", avatar_url: "https://avatars.githubusercontent.com/u/1?v=4", html_url: "https://github.com/mojombo" },
  { id: 2, login: "defunkt", avatar_url: "https://avatars.githubusercontent.com/u/2?v=4", html_url: "https://github.com/defunkt" },
  { id: 3, login: "pjhyett", avatar_url: "https://avatars.githubusercontent.com/u/3?v=4", html_url: "https://github.com/pjhyett" },
  { id: 4, login: "wycats", avatar_url: "https://avatars.githubusercontent.com/u/4?v=4", html_url: "https://github.com/wycats" },
  { id: 5, login: "ezmobius", avatar_url: "https://avatars.githubusercontent.com/u/5?v=4", html_url: "https://github.com/ezmobius" },
  { id: 6, login: "ivey", avatar_url: "https://avatars.githubusercontent.com/u/6?v=4", html_url: "https://github.com/ivey" },
  { id: 7, login: "evanphx", avatar_url: "https://avatars.githubusercontent.com/u/7?v=4", html_url: "https://github.com/evanphx" },
  { id: 8, login: "vanpelt", avatar_url: "https://avatars.githubusercontent.com/u/8?v=4", html_url: "https://github.com/vanpelt" },
  { id: 9, login: "wayneeseguin", avatar_url: "https://avatars.githubusercontent.com/u/9?v=4", html_url: "https://github.com/wayneeseguin" },
  { id: 10, login: "brynary", avatar_url: "https://avatars.githubusercontent.com/u/10?v=4", html_url: "https://github.com/brynary" },
  { id: 11, login: "koke", avatar_url: "https://avatars.githubusercontent.com/u/11?v=4", html_url: "https://github.com/koke" },
  { id: 12, login: "jnewland", avatar_url: "https://avatars.githubusercontent.com/u/12?v=4", html_url: "https://github.com/jnewland" },
];

export function useUserList() {
  const [users, setUsers] = useState<GitHubUser[]>(INITIAL_USERS);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

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
