import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useUserList } from "../hooks/useUserList";
import { generateFakeUsers } from "../test/generateFakeUsers";

const MOCKED_USERS = generateFakeUsers(10);

describe("useUserList", () => {
  test("initializes with mock users and no selection", () => {
    const { result } = renderHook(() => useUserList(MOCKED_USERS));

    expect(result.current.users.length).toBeGreaterThan(0);
    expect(result.current.selectedCount).toBe(0);
  });

  test("toggles a single user selection", () => {
    const { result } = renderHook(() => useUserList(MOCKED_USERS));
    const firstId = result.current.users[0].id;

    act(() => {
      result.current.toggleSelect(firstId);
    });

    expect(result.current.selectedIds.has(firstId)).toBe(true);
    expect(result.current.selectedCount).toBe(1);

    act(() => {
      result.current.toggleSelect(firstId);
    });

    expect(result.current.selectedIds.has(firstId)).toBe(false);
    expect(result.current.selectedCount).toBe(0);
  });

  test("selects all users", () => {
    const { result } = renderHook(() => useUserList(MOCKED_USERS));

    act(() => {
      result.current.toggleSelectAll();
    });

    expect(result.current.selectedCount).toBe(result.current.totalCount);
  });

  test("deselects all when all are selected", () => {
    const { result } = renderHook(() => useUserList(MOCKED_USERS));

    act(() => result.current.toggleSelectAll());
    act(() => result.current.toggleSelectAll());

    expect(result.current.selectedCount).toBe(0);
  });

  test("duplicates selected users", () => {
    const { result } = renderHook(() => useUserList(MOCKED_USERS));
    const initialCount = result.current.totalCount;
    const firstId = result.current.users[0].id;

    act(() => result.current.toggleSelect(firstId));
    act(() => result.current.duplicateSelected());

    expect(result.current.totalCount).toBe(initialCount + 1);
    expect(result.current.selectedCount).toBe(0); // sélection reset
  });

  test("duplicated users have unique ids", () => {
    const { result } = renderHook(() => useUserList(MOCKED_USERS));

    act(() => result.current.toggleSelectAll());
    act(() => result.current.duplicateSelected());

    const ids = result.current.users.map((u) => u.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test("deletes selected users", () => {
    const { result } = renderHook(() => useUserList(MOCKED_USERS));
    const initialCount = result.current.totalCount;
    const firstId = result.current.users[0].id;

    act(() => result.current.toggleSelect(firstId));
    act(() => result.current.deleteSelected());

    expect(result.current.totalCount).toBe(initialCount - 1);
    expect(result.current.users.find((u) => u.id === firstId)).toBeUndefined();
    expect(result.current.selectedCount).toBe(0); // sélection reset
  });
});
