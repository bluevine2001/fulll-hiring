import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import SearchInput from "../components/SearchInput";

describe("SearchInput", () => {
  test("renders with placeholder text", () => {
    render(<SearchInput query="" onChangeQuery={() => {}} />);

    expect(
      screen.getByPlaceholderText("Search GitHub users..."),
    ).toBeInTheDocument();
  });

  test("displays the current query value", () => {
    render(<SearchInput query="react" onChangeQuery={() => {}} />);

    expect(screen.getByRole("textbox")).toHaveValue("react");
  });

  test("calls onChangeQuery with new value when typing", async () => {
    const onChangeQuery = vi.fn();
    render(<SearchInput query="" onChangeQuery={onChangeQuery} />);

    await userEvent.type(screen.getByRole("textbox"), "vue");

    expect(onChangeQuery).toHaveBeenCalledTimes(3); // une fois par lettre
    expect(onChangeQuery).toHaveBeenLastCalledWith("e"); // dernière lettre tapée
  });

  test("calls onChangeQuery with empty string when cleared", async () => {
    const onChangeQuery = vi.fn();
    render(<SearchInput query="react" onChangeQuery={onChangeQuery} />);

    await userEvent.clear(screen.getByRole("textbox"));

    expect(onChangeQuery).toHaveBeenLastCalledWith("");
  });
});
