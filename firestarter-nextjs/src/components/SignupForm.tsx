import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
    onSignupClick: (username: string, password: string) => void;
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
    username: string;
    password: string;
};

export default function SignupForm({ onSignupClick }: Props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onSubmit = ({ username, password }: FormData) => {
        onSignupClick(username, password);
    };

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
                <input {...register("username", { required: "Email address is required", pattern: { value: /^[^@\s]+@[^@\s]+$/, message: 'Email address is invalid' } })} type="email" className={inputClasses} aria-describedby="Email Address" placeholder="Email address" />
                {errors.username && <p role="alert">{errors.username?.message}</p>}
            </div>
            <div className="form-group mb-6">
                <input {...register("password", { required: "Password is required" })} type="password" className={inputClasses} aria-describedby="Password" placeholder="Password" />
                {errors.password && <p role="alert">{errors.password?.message}</p>}
            </div>
            <button type="submit" className={signupButtonClasses}>Sign up</button>
        </form>
    </div>;
}