import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { renderWithProviders } from "./utilities/test-utilts";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import TodoApp from "./TodoApp";

import crypto from "crypto";

Object.defineProperty(globalThis, "crypto", {
  value: {
    getRandomValues: (arr: string | any[]) => crypto.randomBytes(arr.length),
  },
});

describe("Application", () => {
  const handlers = [
    rest.get("http://localhost:9091/api/todo", async (_req, res, ctx) => {
      return await res(
        ctx.json({
          toDos: [
            {
              id: 1,
              title: "sample title 1",
            },
            {
              id: 2,
              title: "sample title 2",
            },
            {
              id: 3,
              title: "sample title 3",
            },
          ],
        }),
        ctx.delay(150),
      );
    }),
    rest.put(
      "http://localhost:9091/api/todo/update",
      async (_req, res, ctx) => {
        return await res(ctx.status(200), ctx.delay(150));
      },
    ),
    rest.post("http://localhost:9091/api/todo/add", async (_req, res, ctx) => {
      return await res(ctx.status(200), ctx.delay(150));
    }),
  ];
  const server = setupServer(...handlers);

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  beforeEach(() => {
    renderWithProviders(<TodoApp />);
  });

  test("shows list of tasks", async () => {
    await screen.findAllByRole("listitem");

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(3);
    expect(screen.queryAllByRole("checkbox")).toHaveLength(3);
    expect(screen.queryAllByRole("button")).toHaveLength(3);
  });

  test("text field can be used to add a new to-do", async () => {
    await screen.findAllByRole("listitem");

    await userEvent.type(screen.getByRole("textbox"), "sample task 4");
    await userEvent.type(screen.getByRole("textbox"), "{enter}");
    await screen.findByText("sample task 4");

    expect(screen.queryAllByRole("listitem")).toHaveLength(4);
  });

  test("clicking on checkbox completes/uncompletes the task", async () => {
    await screen.findAllByRole("listitem");

    await userEvent.click(screen.getAllByRole("checkbox")[0]);

    expect(screen.queryAllByRole("listitem")).toHaveLength(3);
    expect(screen.getAllByRole("checkbox")[0]).toBeChecked();

    await userEvent.click(screen.getAllByRole("checkbox")[0]);
    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();
  });

  test("clicking on X button deletes the task", async () => {
    await screen.findAllByRole("listitem");
    await screen.findAllByRole("button");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    await userEvent.click(screen.getAllByRole("button")[0]);
    await waitForElementToBeRemoved(document.querySelector("button"));

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
