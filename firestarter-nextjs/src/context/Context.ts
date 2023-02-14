import { Backend } from "@/backend/Backend";
import { IBackend } from "@/backend/IBackend";
import React from "react";

export interface ContextInterface {
    backend: IBackend;
}

const backend = new Backend();

export const Context = React.createContext<ContextInterface>({
    backend
});