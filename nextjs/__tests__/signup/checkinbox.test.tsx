import { act, render, screen, waitFor } from "@testing-library/react";
import { Context } from "@/context/Context";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { makeMockContext } from "__tests__/util/mockContext";
import CheckInbox from "@/pages/signup/checkinbox";
import { User } from "firebase/auth";

jest.mock("next/router", () => require("next-router-mock"));

describe("CheckInbox", () => {
  const mockContext = makeMockContext();

  let user: UserEvent;

  const init = (withUser: boolean) => {
    user = userEvent.setup();
    mockContext.user = withUser ? ({ uid: "123" } as User) : undefined;
    render(
      <Context.Provider value={mockContext}>
        <CheckInbox />
      </Context.Provider>,
      { wrapper: MemoryRouterProvider }
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("correct form elements shown when not logged in", () => {
    init(false);
    expect(
      screen.getByRole("heading", { name: "Check your inbox, please!" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Send confirmation email again" })
    ).toBeNull();
    expect(
      screen.getByText(
        "To complete sign up, open the email we have sent you, and click the confirmation link.",
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  it("correct form elements shown when logged in", () => {
    init(true);
    expect(
      screen.getByRole("heading", { name: "Check your inbox, please!" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send confirmation email again" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "To complete sign up, open the email we have sent you, and click the confirmation link.",
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  it("clicking send causes backend to be called", async () => {
    init(true);
    await user.click(
      screen.getByRole("button", { name: "Send confirmation email again" })
    );
    expect(mockContext.backend.sendEmailVerification).toBeCalledWith({
      uid: "123",
    } as User);
  });

  it("clicking send causes button to be disabled", async () => {
    init(true);
    await user.click(
      screen.getByRole("button", { name: "Send confirmation email again" })
    );
    waitFor(() =>
      expect(
        screen.queryByRole("button", { name: "Send confirmation email again" })
      ).toBeDisabled()
    );
  });
});
