import { IBackend } from "@/backend/IBackend";
import { ContextInterface } from "@/context/Context";

export const makeMockContext = () => {

  const backendMocks = {
    signup: jest.fn(),
    login: jest.fn(),
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
    user: undefined,
  };

  // Type check
  const context = mocks as ContextInterface;

  return mocks;
};
