import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import "@testing-library/jest-dom/extend-expect";

describe("<Blog />", () => {
  const blog = {
    likes: 5466,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    id: "5a422a851b54a676234d17f7",
  };

  let component, onLike, onDelete;
  beforeEach(() => {
    onLike = jest.fn();
    onDelete = jest.fn();
    component = render(
      <Blog blog={blog} onLike={onLike} onDelete={onDelete}></Blog>
    );
  });

  test("blog renders title and author by default", () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
  });

  test("blog does not render url and likes by default", () => {
    expect(component.container).not.toHaveTextContent(blog.likes);
    expect(component.container).not.toHaveTextContent(blog.url);
  });

  test("blog renders url and likes after revealing it", () => {
    const button = component.container.querySelector("button");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(blog.likes);
    expect(component.container).toHaveTextContent(blog.url);
  });
});
