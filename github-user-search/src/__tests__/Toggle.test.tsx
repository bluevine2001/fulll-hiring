import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Toggle from "../components/Toggle";
import { setup } from "../test/setup";

describe("Toggle", () => {
  test("renders unchecked when checked is false", () => {
    render(<Toggle checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  test("renders checked when checked is true", () => {
    render(<Toggle checked={true} onChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  test("displays label when provided", () => {
    render(<Toggle checked={false} onChange={() => {}} label="Edit" />);
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  test("does not display label element when label is not provided", () => {
    const { container } = render(
      <Toggle checked={false} onChange={() => {}} />,
    );
    expect(container.querySelector(".toggle-text")).toBeNull();
  });

  test("calls onChange when clicked", async () => {
    const onChange = vi.fn();
    const { user } = setup(<Toggle checked={false} onChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("uses provided id on the input", () => {
    render(<Toggle checked={false} onChange={() => {}} id="my-toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("id", "my-toggle");
  });

  test("label htmlFor matches input id", () => {
    const { container } = render(
      <Toggle
        checked={false}
        onChange={() => {}}
        id="my-toggle"
        label="Edit"
      />,
    );
    const label = container.querySelector("label");
    expect(label).toHaveAttribute("for", "my-toggle");
  });
});
