import { render, screen } from '@testing-library/react'
import Signup from '@/pages/signup';
import { Context } from '@/context/Context';
import userEvent from "@testing-library/user-event";
import { SignupResult } from '@/backend/IBackend';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

describe('Signup', () => {

  const mockContext = {
    backend: { signup: jest.fn(async (u: string, p: string) => ({ result: 'fail' } as SignupResult)) }
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

  async function fillInAllFieldsValid(user: UserEvent) {
    await user.type(screen.getByPlaceholderText('First name'), 'Ben');
    await user.type(screen.getByPlaceholderText('Last name'), 'Neb');
    await user.type(screen.getByPlaceholderText('Email address'), 'me@them.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
  }

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
    await fillInAllFieldsValid(user);
    await user.click(screen.getByText('Sign up'));
    expect(mockContext.backend.signup).toBeCalledWith("me@them.com", "password123", { firstName: 'Ben', lastName: 'Neb' });
  });

  it('validates the email address exists', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByText('Sign up'));
    expect(mockContext.backend.signup).not.toBeCalled();
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toHaveTextContent("Email address is required");
  });

  it('validates the password exists', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Email address'), 'me@them.com');
    await user.click(screen.getByText('Sign up'));
    expect(mockContext.backend.signup).not.toBeCalled();
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toHaveTextContent("Password is required");
  });

  it('validates the password format', async () => {
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Email address'), 'methem');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByText('Sign up'));
    expect(mockContext.backend.signup).not.toBeCalled();
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toHaveTextContent("Email address is invalid");
  });

  describe('handles firebase error return code', () => {
    async function submitFormAndCheckAlertText(expectedAlert: string) {
      const user = userEvent.setup();
      await fillInAllFieldsValid(user);
      await user.click(screen.getByText('Sign up'));
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toHaveTextContent(expectedAlert);
    }

    it('invalid-email', async () => {
      mockContext.backend.signup.mockResolvedValue({ result: 'invalid-email' });
      await submitFormAndCheckAlertText("Email address is invalid");
    });

    it('accounts-not-enabled', async () => {
      mockContext.backend.signup.mockResolvedValue({ result: 'accounts-not-enabled' });
      await submitFormAndCheckAlertText("Sorry there was a server problem while signing up, please try again later.");
    });

    it('email-in-use', async () => {
      mockContext.backend.signup.mockResolvedValue({ result: 'email-in-use' });
      await submitFormAndCheckAlertText("An account with this email already exists. Please pick another email, or try signing in.");
    });

    it('fail', async () => {
      mockContext.backend.signup.mockResolvedValue({ result: 'fail', message: 'Error 500' });
      await submitFormAndCheckAlertText("Sorry there was a server problem while signing up, please try again later.");
    });

    it('weak-password', async () => {
      mockContext.backend.signup.mockResolvedValue({ result: 'weak-password' });
      await submitFormAndCheckAlertText("Password doesn't meet the requirements. Password should have at least 6 characters.");
    });
  });

});
