import { User } from "firebase/auth";

export type SignupResult =
  | { result: "success"; uid: string }

  /**
   * Represents success in creating user, but a failure to store user data
   */
  | { result: "partial-success"; uid: string }
  | { result: "fail"; message: string }
  | { result: "weak-password" }
  | { result: "accounts-not-enabled" }
  | { result: "email-in-use" }
  | { result: "invalid-email" };

export type LoginResult =
  | { result: "success"; uid: string, emailVerified: boolean }
  | { result: "user-not-found" }
  | { result: "wrong-password" }
  | { result: "user-disabled" }
  | { result: "fail"; message: string };

export type PasswordResetResult =
  | { result: "success" }
  | { result: "user-not-found" }
  | { result: "fail"; message: string };

  export type EmailVerificationResult =
    | { result: "success" }
    | { result: "fail"; message: string };

export type AddResult =
  | { result: "success"; id: string }
  | { result: "fail"; message: string };

export type SetResult =
  | { result: "success" }
  | { result: "fail"; message: string };

export type DeleteResult =
  | { result: "success" }
  | { result: "fail"; message: string };

export type GetListResult<T> =
  | { result: "success"; items: T[] }
  | { result: "fail"; message: string };

export type GetItemResult<T> =
| { result: "success"; item: T }
| { result: "fail"; message: string };

export type LogoutResult = { result: "success" } | { result: "fail" };

export interface Profile {
  firstName: string;
  lastName: string; 
}

export interface Todo {
  title: string;
  done: boolean;
}

/** Bolt-on interface that represents the id of the stored item. In Firebase this isn't a field on the record. */
export interface WithId {
  id: string;
}

/** Bolt-on interface that represents the user id of the stored item */
export interface WithUid {
  uid: string;
}

export interface IBackend {
  signup(
    email: string,
    password: string,
    data: Profile
  ): Promise<SignupResult>;
  
  login(email: string, password: string): Promise<LoginResult>;

  logout(): Promise<LogoutResult>;

  resetPassword(email: string): Promise<PasswordResetResult>;

  sendEmailVerification(user: User): Promise<EmailVerificationResult>;

  /*** Gets the user profile for a given user */
  getProfile(uid: string): Promise<GetItemResult<Profile>>;
  
  /*** Sets the user profile for a given user */
  setProfile(uid: string, data: Profile): Promise<SetResult>;

  /*** Adds an item for the given user. Works with any collection, as long as you have set up firestore rules to allow
   * writes. */
  addUserItem<T>(collectionName: string, uid: string, item: T): Promise<AddResult>;
  
  /*** UPdates an item for the given user. Works with any collection, as long as you have set up firestore rules to allow
   * writes. */
  setUserItem<T>(collectionName: string, id: string, item: Partial<T>): Promise<SetResult>;
  
  /*** Deletes an item for the given user. Works with any collection, as long as you have set up firestore rules to allow
   * writes. */
  deleteUserItem(collectionName: string, id: string): Promise<DeleteResult>;
  
  /*** Gets items for the given user. Works with any collection, as long as you have set up firestore rules to allow
   * reads. */
  getUserItems<T>(collectionName: string, uid: string): Promise<GetListResult<T & WithId & WithUid>>;
}