<<<<<<< HEAD
import { render, screen } from "@testing-library/react";
// import App from './App';
import login from "./Frontend/Auth";

test("renders learn react link", () => {
  render(<login />);
=======
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
>>>>>>> 5b247ea0dfc92f707a037726d7ffe0d8207913f0
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
