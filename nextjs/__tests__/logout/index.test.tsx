import { render, screen } from "@testing-library/react";
import { Context } from "@/context/Context";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { makeMockContext } from "__tests__/util/mockContext";
import Index from "@/pages/index";
import { User } from "firebase/auth";

jest.mock("next/router", () => require("next-router-mock"));

describe("Logout", () => {
  const mockContext = makeMockContext();

  let user: UserEvent;

  function doRender(loggedIn: boolean) {
    user = userEvent.setup();
    mockContext.user = loggedIn ? ({ uid: "123" } as User) : undefined;
    render(
      <Context.Provider value={mockContext}>
        <Index />
      </Context.Provider>,
      { wrapper: MemoryRouterProvider }
    );
  }

  it("if logged in, can log out", async () => {
    doRender(true);
    mockContext.backend.logout.mockResolvedValue(undefined);
    await user.click(screen.getByTitle(/user menu/i));
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
    await user.click(screen.getByText(/log out/i));
    expect(mockContext.backend.logout).toBeCalled();
    // Note: We can't assert that the log out button has disappeared, as this is requires a change to authentication state
    // (picked up by useAuthState) which is used by _app.tsx, which is not under test here.
  });

  it("if not logged in, can't log out", async () => {
    doRender(false);
    mockContext.backend.logout.mockResolvedValue(undefined);
    expect(screen.queryByText(/log out/i)).toBeNull();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
