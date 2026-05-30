import { screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Toolbar from "../components/Toolbar";
import { setup } from "../test/setup";

const renderToolbar = (
  overrides: Partial<React.ComponentProps<typeof Toolbar>> = {},
) => {
  const { user } = setup(
    <Toolbar
      selectedCount={0}
      totalCount={0}
      onToggleSelectAll={() => {}}
      onDuplicate={() => {}}
      onDelete={() => {}}
      isEditMode={false}
      onEditModeChange={() => {}}
      {...overrides}
    />,
  );
  return user;
};

describe("Toolbar — edit mode off", () => {
  test("renders the edit toggle", () => {
    renderToolbar();
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  test("hides select-all checkbox", () => {
    renderToolbar();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  test("hides duplicate and delete buttons", () => {
    renderToolbar({ selectedCount: 2, totalCount: 10 });
    expect(
      screen.queryByRole("button", { name: /duplicate/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /delete/i }),
    ).not.toBeInTheDocument();
  });

  test("calls onEditModeChange when toggle clicked", async () => {
    const onEditModeChange = vi.fn();
    const user = renderToolbar({ onEditModeChange });
    await user.click(screen.getByRole("switch"));
    expect(onEditModeChange).toHaveBeenCalledTimes(1);
  });
});

describe("Toolbar — edit mode on", () => {
  test("toggle is checked", () => {
    renderToolbar({ isEditMode: true });
    expect(screen.getByRole("switch")).toBeChecked();
  });

  test("displays selected count", () => {
    renderToolbar({ isEditMode: true, selectedCount: 3, totalCount: 10 });
    expect(screen.getByText("3 elements selected")).toBeInTheDocument();
  });

  test("hides duplicate and delete buttons when nothing selected", () => {
    renderToolbar({ isEditMode: true, selectedCount: 0, totalCount: 10 });
    expect(
      screen.queryByRole("button", { name: /duplicate/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /delete/i }),
    ).not.toBeInTheDocument();
  });

  test("shows duplicate and delete buttons when items are selected", () => {
    renderToolbar({ isEditMode: true, selectedCount: 2, totalCount: 10 });
    expect(
      screen.getByRole("button", { name: /duplicate/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  test("select-all checkbox is checked when all items are selected", () => {
    renderToolbar({ isEditMode: true, selectedCount: 10, totalCount: 10 });
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("select-all checkbox is unchecked when nothing is selected", () => {
    renderToolbar({ isEditMode: true, selectedCount: 0, totalCount: 10 });
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("select-all checkbox is indeterminate when some items are selected", () => {
    renderToolbar({ isEditMode: true, selectedCount: 3, totalCount: 10 });
    expect(
      (screen.getByRole("checkbox") as HTMLInputElement).indeterminate,
    ).toBe(true);
  });

  test("calls onToggleSelectAll when select-all checkbox clicked", async () => {
    const onToggleSelectAll = vi.fn();
    const user = renderToolbar({
      isEditMode: true,
      selectedCount: 0,
      totalCount: 10,
      onToggleSelectAll,
    });
    await user.click(screen.getByRole("checkbox"));
    expect(onToggleSelectAll).toHaveBeenCalledTimes(1);
  });

  test("calls onDuplicate when duplicate button clicked", async () => {
    const onDuplicate = vi.fn();
    const user = renderToolbar({
      isEditMode: true,
      selectedCount: 2,
      totalCount: 10,
      onDuplicate,
    });
    await user.click(screen.getByRole("button", { name: /duplicate/i }));
    expect(onDuplicate).toHaveBeenCalledTimes(1);
  });

  test("calls onDelete when delete button clicked", async () => {
    const onDelete = vi.fn();
    const user = renderToolbar({
      isEditMode: true,
      selectedCount: 2,
      totalCount: 10,
      onDelete,
    });
    await user.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
