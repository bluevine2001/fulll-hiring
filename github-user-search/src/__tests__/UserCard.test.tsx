import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import UserCard from "../components/UserCard";
import { setup } from "../test/setup";

const mockUser = {
  id: 1,
  login: "mojombo",
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  html_url: "https://github.com/mojombo",
};

describe("UserCard", () => {
  test("displays user login and id", () => {
    render(
      <UserCard
        user={mockUser}
        isSelected={false}
        onToggleSelect={() => {}}
        isEditMode={true}
      />,
    );

    expect(screen.getByText("mojombo")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("displays avatar with correct alt text", () => {
    render(
      <UserCard
        user={mockUser}
        isSelected={false}
        onToggleSelect={() => {}}
        isEditMode={true}
      />,
    );

    const avatar = screen.getByAltText("mojombo");
    expect(avatar).toHaveAttribute("src", mockUser.avatar_url);
  });

  test("view profile link points to correct url and opens in new tab", () => {
    render(
      <UserCard
        user={mockUser}
        isSelected={false}
        onToggleSelect={() => {}}
        isEditMode={true}
      />,
    );

    const link = screen.getByRole("link", { name: /view profile/i });
    expect(link).toHaveAttribute("href", "https://github.com/mojombo");
    expect(link).toHaveAttribute("target", "_blank");
  });

  test("checkbox is checked when selected", () => {
    render(
      <UserCard
        user={mockUser}
        isSelected={true}
        onToggleSelect={() => {}}
        isEditMode={true}
      />,
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("checkbox is unchecked when not selected", () => {
    render(
      <UserCard
        user={mockUser}
        isSelected={false}
        onToggleSelect={() => {}}
        isEditMode={true}
      />,
    );

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("calls onToggleSelect with user id when checkbox clicked", async () => {
    const onToggleSelect = vi.fn();
    const { user } = setup(
      <UserCard
        user={mockUser}
        isSelected={false}
        onToggleSelect={onToggleSelect}
        isEditMode={true}
      />,
    );

    await user.click(screen.getByRole("checkbox"));

    expect(onToggleSelect).toHaveBeenCalledWith(1);
    expect(onToggleSelect).toHaveBeenCalledTimes(1);
  });

  test("applies selected class when selected", () => {
    const { container } = render(
      <UserCard
        user={mockUser}
        isSelected={true}
        onToggleSelect={() => {}}
        isEditMode={true}
      />,
    );

    expect(container.firstChild).toHaveClass("user-card--selected");
  });

  test("does not apply selected class when not selected", () => {
    const { container } = render(
      <UserCard
        user={mockUser}
        isSelected={false}
        onToggleSelect={() => {}}
        isEditMode={true}
      />,
    );

    expect(container.firstChild).not.toHaveClass("user-card--selected");
  });

  test("does not display select checkbox when editmode is off", () => {
    render(
      <UserCard
        user={mockUser}
        isSelected={false}
        onToggleSelect={() => {}}
        isEditMode={false}
      />,
    );

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  test("does not apply selected class when editmode is off", () => {
    const { container } = render(
      <UserCard
        user={mockUser}
        isSelected={false}
        onToggleSelect={() => {}}
        isEditMode={false}
      />,
    );

    expect(container.firstChild).not.toHaveClass("user-card--selected");
  });
});
