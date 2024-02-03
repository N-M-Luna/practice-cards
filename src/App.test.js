import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Start Practice button', () => {
  render(<App />);
  const linkElement = screen.getByText(/start practice/i);
  expect(linkElement).toBeInTheDocument();
});
