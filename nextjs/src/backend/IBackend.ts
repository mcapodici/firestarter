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
  | { result: "success"; uid: string }
  | { result: "user-not-found" }
  | { result: "wrong-password" }
  | { result: "user-disabled" }
  | { result: "fail"; message: string };

export type PasswordResetResult =
  | { result: "success" }
  | { result: "user-not-found" }
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

export type LogoutResult =
  | { result: "success" }
  | { result: "fail"; message: string };

export interface ISignupData {
  firstName?: string;
  lastName?: string;
}

export interface Todo {
  id?: string;
  title: string;
  done: boolean;
  uid: string;
}

export interface IBackend {
  signup(
    email: string,
    password: string,
    data: ISignupData
  ): Promise<SignupResult>;
  login(email: string, password: string): Promise<LoginResult>;
  logout(): Promise<LogoutResult>;
  resetPassword(email: string): Promise<PasswordResetResult>;
  addTodo(uid: string, title: string): Promise<AddResult>;
  setTodo(todo: Partial<Todo>): Promise<SetResult>;
  deleteTodo(id: string): Promise<DeleteResult>;
  getTodos(uid: string): Promise<GetListResult<Todo & { id: string }>>;
}
