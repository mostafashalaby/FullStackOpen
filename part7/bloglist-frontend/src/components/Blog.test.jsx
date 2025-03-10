import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Test Blog Title",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
    user: {
      name: "Test User",
    },
  };

  render(<Blog blog={blog} />);

  screen.debug();

  screen.getByText("Test Blog Title Test Author");

  const url = screen.queryByText("http://testurl.com");
  expect(url).toBeNull();

  const likes = screen.queryByText("5");
  expect(likes).toBeNull();
});

test("clicking view button renders url and likes", async () => {
  const blog = {
    title: "Test Blog Title",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
    user: {
      name: "Test User",
    },
  };

  render(<Blog blog={blog} />);

  const button = screen.getByText("view");
  await button.click();

  screen.getByText("http://testurl.com");
  screen.getByText("5");
});

test("clicking like button twice calls event handler twice", async () => {
  const blog = {
    title: "Test Blog Title",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
    user: {
      name: "Test User",
    },
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} updateLike={mockHandler} />);

  const viewButton = screen.getByText("view");
  await viewButton.click();

  const likeButton = screen.getByText("like");
  await likeButton.click();
  await likeButton.click();

  expect(mockHandler.mock.calls).toHaveLength(2);
});
