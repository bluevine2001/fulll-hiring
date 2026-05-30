import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import UserGrid from "../components/UserGrid";
import { setup } from "../test/setup";
import type { GitHubUser } from "../types";

const mockUsers: GitHubUser[] = [
  {
    id: 1,
    login: "mojombo",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    html_url: "https://github.com/mojombo",
  },
  {
    id: 2,
    login: "defunkt",
    avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
    html_url: "https://github.com/defunkt",
  },
];

describe("UserGrid", () => {
  test("renders the correct number of user cards", () => {
    render(
      <UserGrid
        users={mockUsers}
        selectedIds={new Set()}
        onToggleSelect={() => {}}
        emptyMessage="No results"
        isEditMode={true}
      />,
    );

    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });

  test("displays empty message when no users", () => {
    render(
      <UserGrid
        users={[]}
        selectedIds={new Set()}
        onToggleSelect={() => {}}
        emptyMessage="No users found"
        isEditMode={false}
      />,
    );

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  test("does not display empty message when users are present", () => {
    render(
      <UserGrid
        users={mockUsers}
        selectedIds={new Set()}
        onToggleSelect={() => {}}
        emptyMessage="No users found"
        isEditMode={false}
      />,
    );

    expect(screen.queryByText("No users found")).not.toBeInTheDocument();
  });

  test("passes isSelected correctly to user cards", () => {
    render(
      <UserGrid
        users={mockUsers}
        selectedIds={new Set([1])}
        onToggleSelect={() => {}}
        emptyMessage="No results"
        isEditMode={true}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked(); // id 1 — sélectionné
    expect(checkboxes[1]).not.toBeChecked(); // id 2 — pas sélectionné
  });

  test("calls onToggleSelect with correct id when card clicked", async () => {
    const onToggleSelect = vi.fn();
    const { user } = setup(
      <UserGrid
        users={mockUsers}
        selectedIds={new Set()}
        onToggleSelect={onToggleSelect}
        emptyMessage="No results"
        isEditMode={true}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);

    expect(onToggleSelect).toHaveBeenCalledWith(2);
  });
});
