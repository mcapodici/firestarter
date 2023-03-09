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
    });
    expect(screen.getByRole("cell", { name: /my thing/i })).not.toHaveClass(
      "line-through"
    );
    expect(screen.queryAllByRole("row")).toHaveLength(2); // One header row and 1 data row
  });

  it("it correctly shows an item that is done", async () => {
    await renderWith([{ title: "my thing", done: true, uid: "123", id: "1" }]);
    await waitFor(() => {
      expect(
        screen.getByRole("cell", { name: /my thing/i })
      ).toBeInTheDocument();
    });
    expect(screen.getByRole("cell", { name: /my thing/i })).toHaveClass(
      "line-through"
    );
  });

  it("it can remove an item", async () => {
    await renderWith([{ title: "my thing", done: true, uid: "123", id: "1" }]);
    await waitFor(() => {
      expect(
        screen.getByRole("cell", { name: /my thing/i })
      ).toBeInTheDocument();
    });
    await human.click(screen.getByText(/Remove/i));
    await waitFor(() => {
      expect(screen.queryByRole("cell", { name: /my thing/i })).toBeNull();
    });
    expect(mockContext.backend.deleteTodo).toBeCalledWith("1");
  });

  it("it can toggle an item", async () => {
    await renderWith([{ title: "my thing", done: true, uid: "123", id: "1" }]);
    await waitFor(() => {
      expect(
        screen.getByRole("cell", { name: /my thing/i })
      ).toBeInTheDocument();
    });
    expect(screen.getByRole("cell", { name: /my thing/i })).toHaveClass(
      "line-through"
    );
    await human.click(screen.getByText(/Toggle/i));
    await waitFor(() => {
      expect(screen.getByRole("cell", { name: /my thing/i })).not.toHaveClass(
        "line-through"
      );
    });
    expect(mockContext.backend.setTodo).toBeCalledWith({
      done: false,
      id: "1",
    });
    await human.click(screen.getByText(/Toggle/i));
    await waitFor(() => {
      expect(screen.getByRole("cell", { name: /my thing/i })).toHaveClass(
        "line-through"
      );
    });
    expect(mockContext.backend.setTodo).toBeCalledWith({
      done: true,
      id: "1",
    });
  });
  
  it("it can add a todo", async () => {
    mockContext.backend.addTodo.mockResolvedValue({
      result: "success",
      id: "456"
    });
    await renderWith([{ title: "my thing", done: true, uid: "123", id: "1" }]);
    await new Promise(process.nextTick);
    await human.type(screen.getByRole('textbox'), 'Buy Milk');
    await human.click(screen.getByText(/Add Todo/i));
    await waitFor(() => {
      expect(screen.queryByRole("cell", { name: /Buy Milk/i })).not.toBeNull();
    });
    expect(screen.queryAllByRole("row")).toHaveLength(3); // One header row and 2 data rows
    expect(mockContext.backend.addTodo).toBeCalledWith("123", "Buy Milk");
  });
});
