import { firestore } from "@/firebase/init";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  query,
  UpdateData,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  AddResult,
  DeleteResult,
  GetListResult,
  SetResult,
  WithId,
  WithUid,
} from "./IBackend";

function collectionFor<T>(collectionName: string) {
  return collection(firestore, collectionName) as CollectionReference<T>;
}

export async function addUserItem<T>(
  collection: string,
  uid: string,
  item: T
): Promise<AddResult> {
  try {
    const result = await addDoc<T & WithUid>(collectionFor(collection), { ...item, uid });
    return { result: "success", id: result.id };
  } catch (e: any) {
    if (e instanceof Error) {
      return { result: "fail", message: e.message };
    }
    return { result: "fail", message: "" };
  }
}

export async function deleteUserItem(
  collection: string,
  id: string
): Promise<DeleteResult> {
  try {
    await deleteDoc(doc(collectionFor(collection), id));
    return { result: "success" };
  } catch (e: any) {
    if (e instanceof Error) {
      return { result: "fail", message: e.message };
    }
    return { result: "fail", message: "" };
  }
}

export async function setUserItem<T>(
  collection: string,
  id: string,
  item: Partial<T>
): Promise<SetResult> {
  try {
    await updateDoc<T>(
      doc(collectionFor<T>(collection), id),
      item as UpdateData<T>
    );
    return { result: "success" };
  } catch (e: any) {
    if (e instanceof Error) {
      return { result: "fail", message: e.message };
    }
    return { result: "fail", message: "" };
  }
}

export async function getUserItems<T>(
  collection: string,
  uid: string
): Promise<GetListResult<T & WithId & WithUid>> {
  try {
    const q = query(collectionFor<T & WithUid>(collection), where("uid", "==", uid));
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
