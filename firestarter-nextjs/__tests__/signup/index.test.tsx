import { render, screen } from '@testing-library/react'
import Signup from '@/pages/signup';
import { Context, ContextInterface } from '@/context/Context';
import { SignupResult } from '@/backend/IBackend';

describe('Signup', () => {

  const mockContext = {
    backend: { signup: jest.fn(async (u: string, p: string) => SignupResult.Fail) }
  };

  beforeEach(() => render(
    <Context.Provider value={mockContext}>
      <Signup />
    </Context.Provider>
  ));

  it('correct form elements shown', () => {
    expect(screen.getByText('Reap the benefits')).toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(3);
    expect(inputs.map(i => i.attributes.getNamedItem('placeholder')?.value)).toEqual(["First name", "Last name", "Email address"]);
    const pw = screen.getAllByTestId('password');
    expect(pw.length).toBe(1);
    expect(pw[0].attributes.getNamedItem('type')?.value).toBe('password');
  });

  it('sends the submitted data to the signup service', () => {
    
  });
});
