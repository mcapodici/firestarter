import { render, screen, waitFor } from "@testing-library/react";
import { Context } from "@/context/Context";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { makeMockContext } from "__tests__/util/mockContext";
import Todos from "@/pages/todos";
import { User } from "firebase/auth";
import { Todo } from "@/backend/IBackend";
import { act } from "react-dom/test-utils";

jest.mock("next/router", () => require("next-router-mock"));

describe("Todos", () => {
  const mockContext = makeMockContext();

  let human: UserEvent;

  async function renderWith(todos: Todo[]) {
    await act(async () => {
      human = userEvent.setup();
      mockContext.backend.getTodos.mockResolvedValue({
        result: "success",
        items: todos,
      });
      mockContext.user = { uid: "123" } as User;
      render(
        <Context.Provider value={mockContext}>
          <Todos />
        </Context.Provider>,
        { wrapper: MemoryRouterProvider }
      );
    });
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to login page if not logged in", () => {});

  it("correct form elements shown", async () => {
    await renderWith([]);
    expect(screen.getByRole("heading", { name: "Todos" })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("E.g. buy shoelaces")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Todo/i })
    ).toBeInTheDocument();
  });

  it("it correctly shows an item that needs to be done", async () => {
    await renderWith([{ title: "my thing", done: false, uid: "123", id: "1" }]);
    await waitFor(() => {
      expect(
        screen.getByRole("cell", { name: /my thing/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: /my thing/i })).not.toHaveStyle({
        "text-decoration-line": "line-through",
      });
    });
  });
});
