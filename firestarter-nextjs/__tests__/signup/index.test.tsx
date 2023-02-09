import { render, screen } from '@testing-library/react'
import Signup from '@/pages/signup';

describe('Signup', () => {
  beforeEach(() => render(<Signup />));

  it('correct form elements shown', () => {
    expect(screen.getByText('Reap the benefits')).toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(3);
    expect(inputs.map(i => i.attributes.getNamedItem('placeholder')?.value)).toEqual(["First name", "Last name", "Email address"]);
    const pw = screen.getAllByTestId('password');
    expect(pw.length).toBe(1);
    expect(pw[0].attributes.getNamedItem('type')?.value).toBe('password');
  });
});
