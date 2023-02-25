import { Backend } from "@/backend/Backend";
import { IBackend } from "@/backend/IBackend";
import { Toast, ToastAdder } from "@/components/Toasts";
import React from "react";

export interface ContextInterface {
    backend: IBackend;
    toasts: Toast[];
    addToast: ToastAdder;
}

export const Context = React.createContext<ContextInterface>({} as any);