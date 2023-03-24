import { render, screen } from '@testing-library/react'
import { Context } from '@/context/Context';
import userEvent from "@testing-library/user-event";
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { makeMockContext } from '__tests__/util/mockContext';
import Login from '@/pages/login';

jest.mock('next/router', () => require('next-router-mock'));

describe('Login', () => {

  const mockContext = makeMockContext();

  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    render(
      <Context.Provider value={mockContext}>
        <Login />
      </Context.Provider>,
      { wrapper: MemoryRouterProvider }
    )
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  async function fillInAllFieldsValid() {
    await user.type(screen.getByPlaceholderText('Email address'), 'me@them.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
  }

  function expectNoBackendCall() {
    expect(mockContext.backend.login).not.toBeCalled();
  }

  async function submitFormAndCheckAlertText(expectedAlert: string) {
    await user.click(screen.getByRole('button', { name: /Log in/i }));
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toHaveTextContent(expectedAlert);
  }

  it('correct form elements shown', () => {
    expect(screen.getByRole("heading", { name: "Log in" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    const pw = screen.getByPlaceholderText('Password');
    expect(pw).toBeInTheDocument();
    expect(pw.attributes.getNamedItem('type')?.value).toBe('password');
  });

  describe('on valid input submission', () => {
    describe('with success response and verified user', () => {
      beforeEach(async () => {
        mockContext.backend.login.mockResolvedValue({ result: 'success', emailVerified: true });
        await fillInAllFieldsValid();
        await user.click(screen.getByRole('button', { name: /Log in/i }));
      })
      it('submits the data correctly', async () => {
        expect(mockContext.backend.login).toBeCalledWith("me@them.com", "password123");
      });
      it('redirects to the home page', async () => {
        expect(mockRouter.asPath).toEqual('/');
      });
      it('shows success alert', async () => {
        expect(mockContext.addToast).toBeCalledTimes(1);
        expect(mockContext.addToast).toBeCalledWith('You are now logged in.', 'success');
      });
    });

    describe('with success response and unverified user', () => {
      beforeEach(async () => {
        mockContext.backend.login.mockResolvedValue({ result: 'success', emailVerified: false });
        await fillInAllFieldsValid();
        await user.click(screen.getByRole('button', { name: /Log in/i }));
      })
      it('submits the data correctly', async () => {
        expect(mockContext.backend.login).toBeCalledWith("me@them.com", "password123");
      });
      it('redirects to the check inbox page', async () => {
        expect(mockRouter.asPath).toEqual('/signup/checkinbox');
      });
      it('shows warning alert', async () => {
        expect(mockContext.addToast).toBeCalledTimes(1);
        expect(mockContext.addToast).toBeCalledWith('You need to verify your email.', 'warning');
      });
    });
  });

  it('validates the email address exists', async () => {
    await fillInAllFieldsValid();
    await user.clear(screen.getByPlaceholderText('Email address'));
    await submitFormAndCheckAlertText("Email address is required");
    expectNoBackendCall();
  });

  it('validates the password exists', async () => {
    await fillInAllFieldsValid();
    await user.clear(screen.getByPlaceholderText('Password'));
    await submitFormAndCheckAlertText("Password is required");
    expectNoBackendCall();
  });

  it('validates the email format', async () => {
    await fillInAllFieldsValid();
    await user.clear(screen.getByPlaceholderText('Email address'));
    await user.type(screen.getByPlaceholderText('Email address'), 'methem');
    await submitFormAndCheckAlertText("Email address is invalid");
    expectNoBackendCall();
  });

  describe('handles firebase error return code', () => {
    it('user-not-found', async () => {
      mockContext.backend.login.mockResolvedValue({ result: 'user-not-found' });
      await fillInAllFieldsValid();
      await submitFormAndCheckAlertText('No user exists with this email');
    });

    it('wrong-password', async () => {
      mockContext.backend.login.mockResolvedValue({ result: 'wrong-password' });
      await fillInAllFieldsValid();
      await submitFormAndCheckAlertText('Password is incorrect');
    });

    it('user-disabled', async () => {
      mockContext.backend.login.mockResolvedValue({ result: 'user-disabled' });
      await fillInAllFieldsValid();
      await submitFormAndCheckAlertText('Your login has been disabled. Please contact support for assistance.');
    });

    it('fail', async () => {
      mockContext.backend.login.mockResolvedValue({ result: 'fail' });
      await fillInAllFieldsValid();
      await submitFormAndCheckAlertText("Sorry there was a server problem while logging in, please try again later.");
    });
  });

});
