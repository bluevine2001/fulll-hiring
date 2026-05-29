import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import Toolbar from "../components/Toolbar";

describe("Toolbar", () => {
  test("displays selected count", () => {
    render(
      <Toolbar
        selectedCount={3}
        totalCount={10}
        onToggleSelectAll={() => {}}
        onDuplicate={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(screen.getByText("3 elements selected")).toBeInTheDocument();
  });

  test("hides duplicate and delete buttons when nothing selected", () => {
    render(
      <Toolbar
        selectedCount={0}
        totalCount={10}
        onToggleSelectAll={() => {}}
        onDuplicate={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /duplicate/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /delete/i }),
    ).not.toBeInTheDocument();
  });

  test("shows duplicate and delete buttons when items are selected", () => {
    render(
      <Toolbar
        selectedCount={2}
        totalCount={10}
        onToggleSelectAll={() => {}}
        onDuplicate={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(
      screen.getByRole("button", { name: /duplicate/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  test("checkbox is checked when all items are selected", () => {
    render(
      <Toolbar
        selectedCount={10}
        totalCount={10}
        onToggleSelectAll={() => {}}
        onDuplicate={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("checkbox is unchecked when nothing is selected", () => {
    render(
      <Toolbar
        selectedCount={0}
        totalCount={10}
        onToggleSelectAll={() => {}}
        onDuplicate={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("checkbox is indeterminate when some items are selected", () => {
    render(
      <Toolbar
        selectedCount={3}
        totalCount={10}
        onToggleSelectAll={() => {}}
        onDuplicate={() => {}}
        onDelete={() => {}}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    expect((checkbox as HTMLInputElement).indeterminate).toBe(true);
  });

  test("calls onToggleSelectAll when checkbox clicked", async () => {
    const onToggleSelectAll = vi.fn();
    render(
      <Toolbar
        selectedCount={0}
        totalCount={10}
        onToggleSelectAll={onToggleSelectAll}
        onDuplicate={() => {}}
        onDelete={() => {}}
      />,
    );

    await userEvent.click(screen.getByRole("checkbox"));
    expect(onToggleSelectAll).toHaveBeenCalledTimes(1);
  });

  test("calls onDuplicate when duplicate button clicked", async () => {
    const onDuplicate = vi.fn();
    render(
      <Toolbar
        selectedCount={2}
        totalCount={10}
        onToggleSelectAll={() => {}}
        onDuplicate={onDuplicate}
        onDelete={() => {}}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /duplicate/i }));
    expect(onDuplicate).toHaveBeenCalledTimes(1);
  });

  test("calls onDelete when delete button clicked", async () => {
    const onDelete = vi.fn();
    render(
      <Toolbar
        selectedCount={2}
        totalCount={10}
        onToggleSelectAll={() => {}}
        onDuplicate={() => {}}
        onDelete={onDelete}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
