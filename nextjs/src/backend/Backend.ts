import {
  AddResult,
  DeleteResult,
  EmailVerificationResult,
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
  WithId,
  WithUid,
} from "./IBackend";
import doSignUp from "./Signup";
import doLogin from "./Login";
import doLogout from "./Logout";
import doResetPassword from "./ResetPassword";
import doSendEmailVerification from "./SendEmailVerification";
import * as useritem from "./UserItem";
import * as profile from "./Profile";
import { User } from "firebase/auth";

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
  async sendEmailVerification(user: User): Promise<EmailVerificationResult> {
    return await doSendEmailVerification(user);
  }
  async getProfile(uid: string): Promise<GetItemResult<Profile>> {
    return await profile.getProfile(uid);
  }
  async setProfile(uid: string, data: Profile): Promise<SetResult> {
    return await profile.setProfile(uid, data);
  }
  async addUserItem<T>(collectionName: string, uid: string, item: T): Promise<AddResult> {
    return await useritem.addUserItem(collectionName, uid, item);
  }
  async setUserItem<T>(collectionName: string, id: string, item: Partial<T>): Promise<SetResult> {
    return await useritem.setUserItem(collectionName, id, item);
  }
  async deleteUserItem(collectionName: string, id: string): Promise<DeleteResult> {
    return await useritem.deleteUserItem(collectionName, id);
  }
  async getUserItems<T>(collectionName: string, uid: string): Promise<GetListResult<T & WithId & WithUid>> {
    return await useritem.getUserItems(collectionName, uid);
  }
}