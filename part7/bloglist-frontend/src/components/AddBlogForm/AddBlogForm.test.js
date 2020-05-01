import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import AddBlogForm from "./AddBlogForm";

describe("<AddBlogForm />", () => {
  test("add blog form returns a blog object with the fields that are filled", () => {
    const onBlogAdded = jest.fn();
    const component = render(
      <AddBlogForm onBlogAdded={onBlogAdded}></AddBlogForm>
    );

    const form = component.container.querySelector("form");
    const titleField = component.container.querySelector(".input-title");
    const authorField = component.container.querySelector(".input-author");
    const urlField = component.container.querySelector(".input-url");

    const blog = {
      title: "A blog",
      author: "An author",
      url: "https://example.org",
    };

    fireEvent.change(titleField, {
      target: { value: blog.title },
    });
    fireEvent.change(authorField, {
      target: { value: blog.author },
    });
    fireEvent.change(urlField, {
      target: { value: blog.url },
    });
    fireEvent.submit(form);
    expect(onBlogAdded.mock.calls[0][0]).toEqual(blog);
  });
});
