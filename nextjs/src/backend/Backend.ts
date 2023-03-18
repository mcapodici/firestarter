import {
  AddResult,
  DeleteResult,
  GetItemResult,
  GetListResult,
  IBackend,
  LoginResult,
  LogoutResult,
  PasswordResetResult,
  Profile,
  SetResult,
  SignupResult,
  Todo,
} from "./IBackend";
import doSignUp from "./Signup";
import doLogin from "./Login";
import doLogout from "./Logout";
import doResetPassword from "./ResetPassword";
import * as todos from "./Todo";
import * as profile from "./Profile";

export class Backend implements IBackend {
  async login(email: string, password: string): Promise<LoginResult> {
    return await doLogin(email, password);
  }
  async logout(): Promise<LogoutResult> {
    return await doLogout();
  }
  async signup(
    email: string,
    password: string,
    data: Profile
  ): Promise<SignupResult> {
    return await doSignUp(email, password, data);
  }
  async resetPassword(email: string): Promise<PasswordResetResult> {
    return await doResetPassword(email);
  }
  async addTodo(uid: string, title: string): Promise<AddResult> {
    return await todos.addTodo(uid, title);
  }
  async setTodo(todo: Partial<Todo> & { id: string }): Promise<SetResult> {
    return await todos.setTodo(todo);
  }
  async deleteTodo(id: string): Promise<DeleteResult> {
    return await todos.deleteTodo(id);
  }
  async getTodos(uid: string): Promise<GetListResult<Todo & { id: string }>> {
    return await todos.getTodos(uid);
  }
  async getProfile(uid: string): Promise<GetItemResult<Profile>> {
    return await profile.getProfile(uid);
  }
  async setProfile(uid: string, data: Profile): Promise<SetResult> {
    return await profile.setProfile(uid, data);
  }
}
