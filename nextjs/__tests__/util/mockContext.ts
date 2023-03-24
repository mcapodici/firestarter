import { IBackend } from "@/backend/IBackend";
import { ContextInterface } from "@/context/Context";
import { User } from "firebase/auth";

export const makeMockContext = () => {

  const backendMocks = {
    signup: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    resetPassword: jest.fn(),
    setProfile: jest.fn(),
    getProfile: jest.fn(),
    addUserItem: jest.fn(),
    setUserItem: jest.fn(),
    getUserItems: jest.fn(),
    deleteUserItem: jest.fn(),
    sendEmailVerification: jest.fn()
  };

  // Type check
  const backend = backendMocks as IBackend;

  const mocks = {
    backend: backendMocks,
    toasts: [],
    addToast: jest.fn(),
    user: undefined as User | undefined,
    authLoading: false
  };

  // Type check
  const context = mocks as ContextInterface;

  return mocks;
};
