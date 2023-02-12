import { useState } from "react";

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

export default function SignupForm({ onSignupClick }: Props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    return <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form>
            <div className="grid md:grid-cols-2 md:gap-4">
                <div className="form-group mb-6">
                    <input type="text" className={inputClasses} aria-describedby="First Name" placeholder="First name" />
                </div>
                <div className="form-group mb-6">
                    <input type="text" className={inputClasses} aria-describedby="Last Name" placeholder="Last name" />
                </div>
            </div>
            <div className="form-group mb-6">
                <input value={username} onChange={(evt) => setUserName(evt.target.value)} type="email" className={inputClasses} aria-describedby="Email Address" placeholder="Email address" />
            </div>
            <div className="form-group mb-6">
                <input value={password} onChange={(evt) => setPassword(evt.target.value)} type="password" className={inputClasses} aria-describedby="Password" placeholder="Password" />
            </div>
            <button type="submit" onClick={(event) => {
                event.preventDefault();
                if (username.length > 0 && password.length > 0)
                    onSignupClick(username, password);
            }} className={signupButtonClasses}>Sign up</button>
        </form>
    </div>;
}