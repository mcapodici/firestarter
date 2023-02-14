import { act, fireEvent, render, screen } from '@testing-library/react'
import Signup from '@/pages/signup';
import { Context } from '@/context/Context';
import { SignupResult } from '@/backend/IBackend';
import userEvent from "@testing-library/user-event";

describe('Signup', () => {

  const mockContext = {
    backend: { signup: jest.fn(async (u: string, p: string) => SignupResult.Fail) }
  };

  beforeEach(() => {
    render(
      <Context.Provider value={mockContext}>
        <Signup />
      </Context.Provider>
    )
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('correct form elements shown', () => {
    expect(screen.getByText('Reap the benefits')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    const pw = screen.getByPlaceholderText('Password');
    expect(pw).toBeInTheDocument();
    expect(pw.attributes.getNamedItem('type')?.value).toBe('password');
  });

  it('sends the submitted data to the signup service', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Email address'), 'me@them.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByText('Sign up'));
    expect(mockContext.backend.signup).toBeCalledWith("me@them.com", "password123");
  });

  it('validates the email address exists', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByText('Sign up'));
    expect(mockContext.backend.signup).not.toBeCalled();
  });

  it('validates the password exists', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Email address'), 'me@them.com');
    await user.click(screen.getByText('Sign up'));
    expect(mockContext.backend.signup).not.toBeCalled();
  });

  it('validates the password format', async () => {
      const user = userEvent.setup();
      await user.type(screen.getByPlaceholderText('Email address'), 'me-them.com');
      await user.type(screen.getByPlaceholderText('Password'), 'password123');
      fireEvent.click(screen.getByText('Sign up'));
    expect(mockContext.backend.signup).not.toBeCalled();
  });

});
