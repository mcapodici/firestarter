import {
  AddResult,
  GetListResult,
  IBackend,
  ISignupData,
  LoginResult,
  PasswordResetResult,
  SetResult,
  SignupResult,
  Todo,
} from "./IBackend";
import doSignUp from "./Signup";
import doLogin from "./Login";
import doResetPassword from "./ResetPassword";
import * as todos from "./Todo";
import { Address } from "cluster";

export class Backend implements IBackend {
  async login(email: string, password: string): Promise<LoginResult> {
    return await doLogin(email, password);
  }
  async signup(
    email: string,
    password: string,
    data: ISignupData
  ): Promise<SignupResult> {
    return await doSignUp(email, password, data);
  }
  async resetPassword(email: string): Promise<PasswordResetResult> {
    return await doResetPassword(email);
  }
  async addTodo(uid: string, title: string): Promise<AddResult> {
    return await todos.addTodo(uid, title);
  }
  async getTodos(uid: string): Promise<GetListResult<Todo & { id: string }>> {
    return await todos.getTodos(uid);
  }
  async setTodo(todo: Partial<Todo> & { id: string }): Promise<SetResult> {
    return await todos.setTodo(todo);
  }
}
