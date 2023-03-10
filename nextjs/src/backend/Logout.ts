import {
  signOut,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { LogoutResult } from "./IBackend";
import { auth } from "@/firebase/config";

export default async function doLogout(): Promise<LogoutResult> {
  try {
    await signOut(auth);
    return { result: "success" };
  } catch (e: unknown) {
    if (!(e instanceof FirebaseError)) {
      return { result: "fail", message: "" };
    }
    return { result: "fail", message: e.message };
  }
}
