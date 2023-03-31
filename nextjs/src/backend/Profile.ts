import { firestore } from "@/firebase/init";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  GetItemResult,
  Profile,
  SetResult,
} from "./IBackend";

const UsersCollectionName = "users";

function usersCollection() {
  return collection(firestore, UsersCollectionName) as CollectionReference<Profile>;
}

export async function setProfile(uid: string, data: Partial<Profile>): Promise<SetResult> {
  try {
    await updateDoc(doc(usersCollection(), uid), data);
    return { result: "success" };
  } catch (e: any) {
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
    if (profileData)
      return { result: "success", item: profileData };
    return { result: "fail", message: "user profile not found" };
  } catch (e: any) {
    if (e instanceof Error) {
      return { result: "fail", message: e.message };
    }
    return { result: "fail", message: "" };
  }
}
