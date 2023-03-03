import { firestore } from "@/firebase/config";
import { collection, CollectionReference, getDocs, query, where } from "firebase/firestore";
import { AddResult, GetListResult, Todo } from "./IBackend";

const TodoCollectionName = 'todo';

export async function addTodo(uid: string, title: string): Promise<AddResult> {
    throw new Error("Method not implemented.");
}

export async function getTodos(uid: string): Promise<GetListResult<Todo>> {
    try {
        const q = query(collection(firestore, TodoCollectionName) as CollectionReference<Todo>,
            where("uid", "==", uid)
        );
        const docs = (await getDocs(q)).docs.map(d => d.data());
        return { result: 'success', items: docs };
    } catch (e: any) {
        if (e instanceof Error) {
            return { result: 'fail', message: e.message };
        }
        return { result: 'fail', message: '' };
    }
}