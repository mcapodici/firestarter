import { FieldError } from "react-hook-form";
import { Alert } from "./Alert";

interface Props {
    error?: FieldError;
}

export default function FieldErrorAlert({ error }: Props) {
    return error ? <div className="mt-2"><Alert level="danger">{error.message}</Alert></div> : <></>;
}