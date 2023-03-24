import { Backend } from "@/backend/Backend";
import { FirebaseError } from "@firebase/util";
import { User } from "firebase/auth";

const sendEmailVerificationFirebase = jest.fn();
const sendEmailVerification = new Backend().sendEmailVerification;

jest.mock("firebase/auth", () => ({
  sendEmailVerification: (...args: any[]) =>
    sendEmailVerificationFirebase(...args),
}));

describe("Reset Password Function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Works with successful result", async () => {
    sendEmailVerificationFirebase.mockResolvedValue(undefined);
    const result = await sendEmailVerification({ uid: "123" } as User);
    expect(result).toEqual({ result: "success" });
    expect(sendEmailVerificationFirebase).toBeCalledWith({ uid: "123" } as User);
  });

  it("Handles an unexpected result from Firebase", async () => {
    sendEmailVerificationFirebase.mockRejectedValue(
      new FirebaseError("auth/something-unencountered", "Cosmic Radiation")
    );
    const result = await sendEmailVerification({ uid: "123" } as User);
    expect(result).toEqual({ result: "fail", message: "Cosmic Radiation" });
    expect(sendEmailVerificationFirebase).toBeCalledWith({ uid: "123" } as User);
  });

  it("Handles an unexpected error entirely", async () => {
    sendEmailVerificationFirebase.mockRejectedValue("xyz");
    const result = await sendEmailVerification({ uid: "123" } as User);
    expect(result).toEqual({ result: "fail", message: "" });
    expect(sendEmailVerificationFirebase).toBeCalledWith({ uid: "123" } as User);
  });
});
