import { firestore } from "@/firebase/config";
import { addDoc, collection, CollectionReference, getDocs, query, where } from "firebase/firestore";
import { AddResult, GetListResult, Todo } from "./IBackend";

const TodoCollectionName = 'todo';

function todoCollection() {
    return collection(firestore, TodoCollectionName) as CollectionReference<Todo>;
}

export async function addTodo(uid: string, title: string): Promise<AddResult> {
    try {
        await addDoc(todoCollection(), { uid, title, done: false });
        return { result: 'success' };
    } catch (e: any) {
        console.log(e);
        console.log({ uid, title, done: false })
        if (e instanceof Error) {
            return { result: 'fail', message: e.message };
        }
        return { result: 'fail', message: '' };
    }
}

export async function getTodos(uid: string): Promise<GetListResult<Todo>> {
    try {
        const q = query(todoCollection(),
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