import React from "react";
import {
  render,
  wait,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { AdminHome } from "../AdminHome";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const server = setupServer(
  rest.get(`${API_DOMAIN}/employees`, (req, res, ctx) => {
    return res(ctx.json([{ id: 1, performance_reviews: [] }]));
  }),
  rest.post(`${API_DOMAIN}/employees`, (req, res, ctx) => {
    return res(ctx.json({ id: 2, performance_reviews: [] }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders without crashing", () => {
  render(<AdminHome />);
});

test("renders employees", async () => {
  const { getByText, getAllByRole } = render(
    <Router initialEntries={["/admin/employees"]}>
      <Switch>
        <Route path="/admin/employees">
          <AdminHome />
        </Route>
      </Switch>
    </Router>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));

  expect(getByText(/employees/i)).toBeInTheDocument();

  const listItems = getAllByRole("listitem");
  expect(listItems).toHaveLength(1);
});

test("renders new employee on add click", async () => {
  const { getByText, getAllByRole } = render(
    <Router initialEntries={["/admin/employees"]}>
      <Switch>
        <Route path="/admin/employees">
          <AdminHome />
        </Route>
      </Switch>
    </Router>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));
  await userEvent.click(getByText(/add/i));
  await wait(() => {
    const listItems = getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });
});
