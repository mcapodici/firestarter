import { Context } from "@/context/Context";
import { useContext, useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { Alert } from "./Alert";
import router from "next/router";

type FormData = {
    firstName: string;
    lastName: string;
};

export default function SignupForm() {
    const { register, handleSubmit, formState: { errors }, setError, setValue, } = useForm<FormData>();
    const { addToast, backend, user } = useContext(Context);

    const onSubmit = async ({ firstName, lastName }: FormData) => {
        if (user) {
            const result = await backend.setProfile(user.uid, { firstName, lastName });
            if (result.result === 'success') {
                addToast('Your changes have been saved', 'success');
            } else {
                addToast('There was a problem. Your changes have not been saved. Please try again.', 'danger');
            }
        }
    };

    useEffect(() => {
        if (user) {
            backend.getProfile(user.uid).then(res => {
                if (res.result === 'success') {
                    setValue('firstName', res.item.firstName);
                    setValue('lastName', res.item.lastName);
                } else {
                    addToast("Sorry. A problem occurred loading your profile. Please referesh the page to try again");
                }
            });
        }
    }, [user])

    const fieldErrorAlertMsg = (err: FieldError | undefined) => err && <div className="mt-2"><Alert level="danger">{err.message}</Alert></div>;

    return <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
                <input {...register("firstName", { required: "First name is required" })} maxLength={100} type="text" className="input" aria-describedby="First name" placeholder="First name" />
                {fieldErrorAlertMsg(errors.firstName)}
            </div>
            <div className="mb-6">
                <input {...register("lastName", { required: "Last name is required" })} type="text" className="input" aria-describedby="Last name" placeholder="Last name" />
                {fieldErrorAlertMsg(errors.lastName)}
            </div>
            <button type="submit" className="button blue w-full">Save Changes</button>

            {errors.root?.serverError && <div className="mt-2"><Alert level="danger">{errors.root.serverError.message}</Alert></div>}
        </form>
    </div>;
}

