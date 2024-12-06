import { render, screen } from "@testing-library/react";
// import App from './App';
import login from "./Frontend/Auth";

test("renders learn react link", () => {
  render(<login />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
