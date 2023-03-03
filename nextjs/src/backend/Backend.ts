import { AddResult, GetListResult, IBackend, ISignupData, LoginResult, PasswordResetResult, SignupResult, Todo } from "./IBackend";
import doSignUp from "./Signup";
import doLogin from "./Login";
import doResetPassword from "./ResetPassword";
import * as todos from './Todo';

export class Backend implements IBackend {
    async login(email: string, password: string): Promise<LoginResult> {
        return await doLogin(email, password);
    }
    async signup(email: string, password: string, data: ISignupData): Promise<SignupResult> {
        return await doSignUp(email, password, data);
    }
    async resetPassword(email: string): Promise<PasswordResetResult> {
        return await doResetPassword(email);
    }
    async addTodo(uid: string, title: string): Promise<AddResult> {
        return await todos.addTodo(uid, title);
    }
    async getTodos(uid: string): Promise<GetListResult<Todo>> {
        return await todos.getTodos(uid);
    }
}