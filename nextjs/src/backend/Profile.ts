import { firestore } from "@/firebase/init";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { GetItemResult, Profile, SetResult } from "./IBackend";

const UsersCollectionName = "users";

function usersCollection() {
  return collection(
    firestore,
    UsersCollectionName
  ) as CollectionReference<Profile>;
}

export async function setProfile(
  uid: string,
  data: Partial<Profile>
): Promise<SetResult> {
  try {
    await setDoc(doc(usersCollection(), uid), data);
    return { result: "success" };
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      return { result: "fail", message: e.message };
    }
    return { result: "fail", message: "" };
  }
}

export async function getProfile(uid: string): Promise<GetItemResult<Profile>> {
  try {
    const userRef = doc(usersCollection(), uid) as DocumentReference<Profile>;
    const profile = await getDoc<Profile>(userRef);
    const profileData = profile.data();
    if (profileData) return { result: "success", item: profileData };
    return { result: "success", item: { firstName: "", lastName: "" } };
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      return { result: "fail", message: e.message };
    }
    return { result: "fail", message: "" };
  }
}
