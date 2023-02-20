import { SignupResult } from "@/backend/IBackend";
import { FieldError, useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { Alert } from "./Alert";

interface Props {
    onSignupClick: (email: string, password: string) => Promise<SignupResult>;
}

const signupButtonClasses = `w-full
px-6
py-2.5
bg-blue-600
text-white
font-medium
text-xs
leading-tight
uppercase
rounded
shadow-md
hover:bg-blue-700 hover:shadow-lg
focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-blue-800 active:shadow-lg
transition
duration-150
ease-in-out`;

const inputClasses = `form-control
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;

type FormData = {
    email: string;
    password: string;
};

export default function SignupForm({ onSignupClick }: Props) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>();


    const onSubmit = async ({ email, password }: FormData) => {
        const result = await onSignupClick(email, password);
        if (result.result === 'success') {
            // TODO - redirect to login
            return;
        }

        match(result.result)
            .with('invalid-email', () => setError('email', { message: "Email address is invalid." }))
            .with('email-in-use', () => setError('email', { message: "An account with this email already exists. Please pick another email, or try signing in." }))
            .with('weak-password', () => setError('password', { message: "Password doesn't meet the requirements. Password should have at least 6 characters." }))
            .otherwise(() => setError('root.serverError', { message: "Sorry there was a server problem while signing up, please try again later." }));
    };

    const fieldErrorAlertMsg = (err: FieldError | undefined) => err && <div className="mt-2"><Alert level="danger">{err.message}</Alert></div>;

    return <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 md:gap-4">
                <div className="form-group mb-6">
                    <input type="text" className={inputClasses} aria-describedby="First Name" placeholder="First name" />
                </div>
                <div className="form-group mb-6">
                    <input type="text" className={inputClasses} aria-describedby="Last Name" placeholder="Last name" />
                </div>
            </div>
            <div className="form-group mb-6">
                <input {...register("email", { required: "Email address is required", pattern: { value: /^[^@\s]+@[^@\s]+$/, message: 'Email address is invalid' } })} type="text" className={inputClasses} aria-describedby="Email Address" placeholder="Email address" />
                {fieldErrorAlertMsg(errors.email)}
            </div>
            <div className="form-group mb-6">
                <input {...register("password", { required: "Password is required" })} type="password" className={inputClasses} aria-describedby="Password" placeholder="Password" />
                {fieldErrorAlertMsg(errors.password)}
            </div>
            <button type="submit" className={signupButtonClasses}>Sign up</button>

            {errors.root?.serverError && <div className="mt-2"><Alert level="danger">{errors.root.serverError.message}</Alert></div>}
        </form>
    </div>;
}