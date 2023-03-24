import { act, render, screen } from '@testing-library/react'
import { Context } from '@/context/Context';
import userEvent from "@testing-library/user-event";
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { makeMockContext } from '__tests__/util/mockContext';
import ResetPassword from '@/pages/resetpassword';

jest.mock('next/router', () => require('next-router-mock'));

describe('ResetPassword', () => {

  const mockContext = makeMockContext();

  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    render(
      <Context.Provider value={mockContext}>
        <ResetPassword />
      </Context.Provider>,
      { wrapper: MemoryRouterProvider }
    )
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  async function fillInAllFieldsValid() {
    await user.type(screen.getByPlaceholderText('Email address'), 'me@them.com');
  }

  function expectNoBackendCall() {
    expect(mockContext.backend.resetPassword).not.toBeCalled();
  }

  async function submitFormAndCheckAlertText(expectedAlert: string) {
    await user.click(screen.getByRole('button', { name: /Send Reset Password Link/i }));
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toHaveTextContent(expectedAlert);
  }

  it('correct form elements shown', () => {
    expect(screen.getByRole("heading", { name: "Reset Password" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Reset Password Link" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
  });

  describe('on valid input submission', () => {
    describe('with success response', () => {
      beforeEach(async () => {
        act(() => {
          mockRouter.setCurrentUrl('/resetpassword');
        });
        mockContext.backend.resetPassword.mockResolvedValue({ result: 'success' });
        await fillInAllFieldsValid();
        await user.click(screen.getByRole('button', { name: /Send Reset Password Link/i }));
      })
      it('submits the data correctly', async () => {
        expect(mockContext.backend.resetPassword).toBeCalledWith("me@them.com");
      });
      it('stays on the same page', async () => {
        expect(mockRouter.asPath).toEqual('/resetpassword');
      });
      it('shows success alert', async () => {
        expect(mockContext.addToast).toBeCalledTimes(1);
        expect(mockContext.addToast).toBeCalledWith('Your password reset link has been sent.', 'success');
      });
    });
  });

  it('validates the email address exists', async () => {
    await fillInAllFieldsValid();
    await user.clear(screen.getByPlaceholderText('Email address'));
    await submitFormAndCheckAlertText("Email address is required");
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
      mockContext.backend.resetPassword.mockResolvedValue({ result: 'user-not-found' });
      await fillInAllFieldsValid();
      await submitFormAndCheckAlertText('No user exists with this email');
    });

    it('fail', async () => {
      mockContext.backend.resetPassword.mockResolvedValue({ result: 'fail' });
      await fillInAllFieldsValid();
      await submitFormAndCheckAlertText("Sorry there was a server problem while resetting the password, please try again later.");
    });
  });

});
