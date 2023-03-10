import { Context } from "@/context/Context";
import { useContext } from "react";
import { FieldError, useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { Alert } from "./Alert";
import FieldErrorAlert from "./FieldErrorAlert";

type FormData = {
    email: string;
    password: string;
};

export default function ResetPasswordForm() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>();
    const { addToast, backend } = useContext(Context);

    const onSubmit = async ({ email }: FormData) => {
        const result = await backend.resetPassword(email);

        if (result.result === 'success') {
            addToast('Your password reset link has been sent.', 'success');
            return;
        }

        match(result.result)
            .with('user-not-found', () => setError('email', { message: 'No user exists with this email' }))
            .otherwise(() => setError('root.serverError', { message: "Sorry there was a server problem while resetting the password, please try again later." }));
    };

    const fieldErrorAlertMsg = (err: FieldError | undefined) => err && <div className="mt-2"><Alert level="danger">{err.message}</Alert></div>;

    return <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
                <input {...register("email", { required: "Email address is required", pattern: { value: /^[^@\s]+@[^@\s]+$/, message: 'Email address is invalid' } })} type="text" className="input" aria-describedby="Email Address" placeholder="Email address" />
                <FieldErrorAlert error={errors.email} />
            </div>
            <button type="submit" className="button blue w-full">Send Reset Password Link</button>
            {errors.root?.serverError && <div className="mt-2"><Alert level="danger">{errors.root.serverError.message}</Alert></div>}
        </form>
    </div>;
}
