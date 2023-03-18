import { act, render, screen, waitFor } from "@testing-library/react";
import { Context } from "@/context/Context";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { makeMockContext } from "__tests__/util/mockContext";
import Profile from "@/pages/profile";
import { User } from "firebase/auth";

jest.mock("next/router", () => require("next-router-mock"));

describe("Profile", () => {
  const mockContext = makeMockContext();

  let user: UserEvent;

  function init(resolveGetProfile: boolean = true) {
    if (resolveGetProfile) {
      // Mocks the situation where we get an immediate response for the profile,
      // from the server.
      mockContext.backend.getProfile.mockResolvedValue({
        result: "success",
        item: { firstName: "Anthony", lastName: "Bean" },
      });
    } else {
      // Mocks the situation where we are waiting indefinitely for the profile to
      // load from the server:
      mockContext.backend.getProfile.mockReturnValue(new Promise(() => {}));
    }
    mockRouter.setCurrentUrl("/profile");
    user = userEvent.setup();
    mockContext.user = { uid: "123" } as User;
    render(
      <Context.Provider value={mockContext}>
        <Profile />
      </Context.Provider>,
      { wrapper: MemoryRouterProvider }
    );
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  async function fillInAllFieldsValid() {
    await waitFor(() => {
      expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    });
    await user.clear(screen.getByPlaceholderText("First name"));
    await user.clear(screen.getByPlaceholderText("First name")); // Because of https://github.com/testing-library/user-event/discussions/970
    await user.clear(screen.getByPlaceholderText("Last name"));
    await user.clear(screen.getByPlaceholderText("Last name"));
    await user.type(screen.getByPlaceholderText("First name"), "Ben");
    await user.type(screen.getByPlaceholderText("Last name"), "Neb");
  }

  function expectNoSaveCall() {
    expect(mockContext.backend.setProfile).not.toBeCalled();
  }

  async function submitFormAndCheckAlertText(expectedAlert: string) {
    await user.click(screen.getByText("Save"));
    await waitFor(async () =>
      expect(await screen.findAllByRole("alert")).toHaveLength(1)
    );
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toHaveTextContent(expectedAlert);
  }

  it("shows loading symbols when loading", async () => {
    init(false);
    expect(screen.getByTitle("Loading Indicator")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("First name")).toBeNull();
    expect(screen.queryByPlaceholderText("Last name")).toBeNull();
  });

  it("correct form elements shown, with loaded values", async () => {
    init();
    await waitFor(() => {
      expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    });
    expect(mockContext.backend.getProfile).toBeCalledWith("123");
    expect(screen.getByText("Your Profile")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("form")).toHaveFormValues({
        firstName: "Anthony",
      });
    });
  });

  describe("on valid input submission", () => {
    describe("with success response", () => {
      beforeEach(async () => {
        mockContext.backend.setProfile.mockResolvedValue({
          result: "success",
          uid: "123",
        });
        init();
        await fillInAllFieldsValid();
        await user.click(screen.getByText("Save"));
      });
      it("sends the submitted data to the signup service", async () => {
        expect(mockContext.backend.setProfile).toBeCalledWith("123", {
          firstName: "Ben",
          lastName: "Neb",
        });
      });
      it("no redirection", async () => {
        expect(mockRouter.asPath).toEqual("/profile");
      });
      it("shows success alert", async () => {
        expect(mockContext.addToast).toBeCalledTimes(1);
        expect(mockContext.addToast).toBeCalledWith(
          "Your changes have been saved",
          "success"
        );
      });
    });
  });

  it("validates the first name exists", async () => {
    init();
    await fillInAllFieldsValid();
    await user.clear(screen.getByPlaceholderText("First name"));
    await submitFormAndCheckAlertText("First name is required");
    expectNoSaveCall();
  });

  it("validates the last name exists", async () => {
    init();
    await fillInAllFieldsValid();
    await user.clear(screen.getByPlaceholderText("Last name"));
    await submitFormAndCheckAlertText("Last name is required");
    expectNoSaveCall();
  });

  describe("handles failed save", () => {
    it("fail", async () => {
      mockContext.backend.setProfile.mockResolvedValue({
        result: "fail",
        message: "Error 500",
      });
      init();
      await fillInAllFieldsValid();
      await user.click(screen.getByText("Save"));
      expect(mockContext.addToast).toBeCalledWith(
        "There was a problem. Your changes have not been saved. Please try again.",
        "danger"
      );
    });
  });
});
