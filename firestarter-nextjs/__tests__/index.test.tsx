import { getByText, render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
  beforeEach(() => render(<Home/>));
  it('shows the navigation', () => {
    const nav = screen.getByRole('navigation');
    ['Dashboard', 'Team', 'Projects', 'Login', 'Sign up for free'].forEach(t => expect(getByText(nav, t)).toBeVisible());
  });
  it('shows the hero text', () => {
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('The best offer for your business');
  });
  it('shows the hero image', () => {
    const image = screen.getByRole('img');
    expect(image.getAttribute('src')).toBeDefined();
    expect(image).toBeVisible();
  });
})
