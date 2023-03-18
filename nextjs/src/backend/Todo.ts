import { firestore } from "@/firebase/config";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  AddResult,
  DeleteResult,
  GetListResult,
  SetResult,
  Todo,
} from "./IBackend";

const TodoCollectionName = "todo";

function todoCollection() {
  return collection(firestore, TodoCollectionName) as CollectionReference<Todo>;
}

export async function addTodo(uid: string, title: string): Promise<AddResult> {
  try {
    const result = await addDoc(todoCollection(), { uid, title, done: false });
    return { result: "success", id: result.id };
  } catch (e: any) {
    if (e instanceof Error) {
      return { result: "fail", message: e.message };
    }
    return { result: "fail", message: "" };
  }
}

export async function deleteTodo(id: string): Promise<DeleteResult> {
  try {
    await deleteDoc(doc(todoCollection(), id));
    return { result: "success" };
  } catch (e: any) {
    if (e instanceof Error) {
      return { result: "fail", message: e.message };
    }
    return { result: "fail", message: "" };
  }
}

export async function setTodo(
  todo: Partial<Todo> & { id: string }
): Promise<SetResult> {
  try {
    await updateDoc(doc(firestore, TodoCollectionName, todo.id), todo);
    return { result: "success" };
  } catch (e: any) {
    if (e instanceof Error) {
      return { result: "fail", message: e.message };
    }
    return { result: "fail", message: "" };
  }
}

export async function getTodos(
  uid: string
): Promise<GetListResult<Todo & { id: string }>> {
  try {
    const q = query(todoCollection(), where("uid", "==", uid));
    const docs = (await getDocs(q)).docs.map((d) => ({
      ...d.data(),
      id: d.id,
    }));
    return { result: "success", items: docs };
  } catch (e: any) {
    if (e instanceof Error) {
      return { result: "fail", message: e.message };
    }
    return { result: "fail", message: "" };
  }
}
