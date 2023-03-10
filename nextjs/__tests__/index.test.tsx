import { fireEvent, getByText, render, screen } from '@testing-library/react'
import Home from '@/pages/index'
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

describe('Home', () => {
  beforeEach(() => render(<Home />));

  it('shows the hero text', () => {
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('The best offer for your business');
  });
  it('shows the hero image', () => {
    const image = screen.getByTestId('hero-image');
    expect(image.getAttribute('src')).toBeDefined();
    expect(image).toBeVisible();
  });
});

describe('Navigation', () => {
  beforeEach(() => render(<Home />, { wrapper: MemoryRouterProvider }));
  it('is shown', () => {
    const nav = screen.getByRole('navigation');
    ['Todos', 'Team', 'Projects', 'Login', 'Sign up for free'].forEach(t => expect(getByText(nav, t)).toBeVisible());
  });
  it('signup', () => {
    const signup = screen.getByText('Sign up for free');
    fireEvent.click(signup);
    expect(mockRouter.asPath).toEqual('/signup');
  })
});
