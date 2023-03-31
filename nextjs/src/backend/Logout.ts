import {
  signOut,
} from "firebase/auth";
import { LogoutResult } from "./IBackend";
import { auth } from "@/firebase/init";

export default async function doLogout(): Promise<LogoutResult> {
  try {
    await signOut(auth);
    return { result: "success" };
  } catch (e: unknown) {
      return { result: "fail" };
  }
}
