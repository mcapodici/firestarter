import { Backend } from "@/backend/Backend";
import { IBackend } from "@/backend/IBackend";
import { Toast, ToastAdder } from "@/components/Toasts";
import { User } from "firebase/auth";
import React from "react";

export interface ContextInterface {
    backend: IBackend;
    toasts: Toast[];
    addToast: ToastAdder;
    user?: User;
    authLoading: boolean;
}

export const Context = React.createContext<ContextInterface>({} as any);