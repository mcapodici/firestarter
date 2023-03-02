export const makeMockContext = () => ({
    backend: { signup: jest.fn(), login: jest.fn(), resetPassword: jest.fn() },
    toasts: [],
    addToast: jest.fn()
});