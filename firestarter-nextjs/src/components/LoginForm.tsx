import { Context } from "@/context/Context";
import { useContext } from "react";
import { FieldError, useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { Alert } from "./Alert";
import router from "next/router";

type FormData = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>();
    const { addToast, backend } = useContext(Context);

    const onSubmit = async ({ email, password }: FormData) => {

      
    };

    const fieldErrorAlertMsg = (err: FieldError | undefined) => err && <div className="mt-2"><Alert level="danger">{err.message}</Alert></div>;

    return <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
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
