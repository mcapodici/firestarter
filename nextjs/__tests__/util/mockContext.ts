import { IBackend } from "@/backend/IBackend";
import { ContextInterface } from "@/context/Context";
import { User } from "firebase/auth";

export const makeMockContext = () => {

  const backendMocks = {
    signup: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    resetPassword: jest.fn(),
    addTodo: jest.fn(),
    setTodo: jest.fn(),
    getTodos: jest.fn(),
    deleteTodo: jest.fn(),
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
