import { Context } from "@/context/Context";
import { useContext } from "react";
import { FieldError, useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { Alert } from "./Alert";
import router from "next/router";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export default function SignupForm() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>();
    const { addToast, backend } = useContext(Context);

    const onSubmit = async ({ firstName, lastName, email, password }: FormData) => {

        const result = await backend.signup(email, password, { firstName, lastName });

        if (result.result === 'success' || result.result === 'partial-success') {
            if (result.result === 'success') {
                addToast('Your account has been created. You can now log in.', 'success');
            } else {
                addToast('Your account has been created, there was an issue trying to save your name to the profile, so you will need to do this again. You can now log in.', 'warning');
            }
            router.push({ pathname: '/login' });
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
                <div className="mb-6">
                    <input {...register("firstName", { required: "First name is required" })} type="text" className={inputClasses} aria-describedby="First name" placeholder="First name" />
                    {fieldErrorAlertMsg(errors.firstName)}
                </div>
                <div className="mb-6">
                    <input {...register("lastName", { required: "Last name is required" })} type="text" className={inputClasses} aria-describedby="Last name" placeholder="Last name" />
                    {fieldErrorAlertMsg(errors.lastName)}
                </div>
            </div>
            <div className="mb-6">
                <input {...register("email", { required: "Email address is required", pattern: { value: /^[^@\s]+@[^@\s]+$/, message: 'Email address is invalid' } })} type="text" className={inputClasses} aria-describedby="Email Address" placeholder="Email address" />
                {fieldErrorAlertMsg(errors.email)}
            </div>
            <div className="mb-6">
                <input {...register("password", { required: "Password is required" })} type="password" className={inputClasses} aria-describedby="Password" placeholder="Password" />
                {fieldErrorAlertMsg(errors.password)}
            </div>
            <button type="submit" className={signupButtonClasses}>Sign up</button>

            {errors.root?.serverError && <div className="mt-2"><Alert level="danger">{errors.root.serverError.message}</Alert></div>}
        </form>
    </div>;
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
