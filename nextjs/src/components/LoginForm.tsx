import { Context } from "@/context/Context";
import { useContext } from "react";
import { FieldError, useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { Alert } from "./Alert";
import router from "next/router";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const { addToast, backend } = useContext(Context);

  const onSubmit = async ({ email, password }: FormData) => {
    const result = await backend.login(email, password);

    if (result.result === "success") {
      if (result.emailVerified) {
        addToast("You are now logged in.", "success");
        router.push("/");
        return;
      } else {
        addToast("You need to verify your email.", "warning");
        router.push("/signup/checkinbox");
        return;
      }
    }

    match(result.result)
      .with("user-disabled", () =>
        setError("root.serverError", {
          message:
            "Your login has been disabled. Please contact support for assistance.",
        })
      )
      .with("user-not-found", () =>
        setError("email", { message: "No user exists with this email" })
      )
      .with("wrong-password", () =>
        setError("password", { message: "Password is incorrect" })
      )
      .otherwise(() =>
        setError("root.serverError", {
          message:
            "Sorry there was a server problem while logging in, please try again later.",
        })
      );
  };

  const fieldErrorAlertMsg = (err: FieldError | undefined) =>
    err && (
      <div className="mt-2">
        <Alert level="danger">{err.message}</Alert>
      </div>
    );

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <input
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+$/,
                message: "Email address is invalid",
              },
            })}
            type="text"
            className="input"
            aria-describedby="Email Address"
            placeholder="Email address"
          />
          {fieldErrorAlertMsg(errors.email)}
        </div>
        <div className="mb-6">
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="input"
            aria-describedby="Password"
            placeholder="Password"
          />
          {fieldErrorAlertMsg(errors.password)}
        </div>
        <button type="submit" className="button blue w-full">
          Log in
        </button>
        <div className="mb-6 pt-10 text-center">
          <Link className="anchor" href="/resetpassword">
            Click here
          </Link>{" "}
          to reset your password.
        </div>
        {errors.root?.serverError && (
          <div className="mt-2">
            <Alert level="danger">{errors.root.serverError.message}</Alert>
          </div>
        )}
      </form>
    </div>
  );
}
