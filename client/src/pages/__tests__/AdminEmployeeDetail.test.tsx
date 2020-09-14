import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { AdminEmployeeDetail } from "../AdminEmployeeDetail";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const server = setupServer(
  rest.get(`${API_DOMAIN}/employees/1`, (req, res, ctx) => {
    return res(ctx.json({ id: 1, performance_reviews: [] }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders without crashing", () => {
  render(
    <Router initialEntries={["/admin/employees/1"]}>
      <Switch>
        <Route path="/admin/employees/:employeeId">
          <AdminEmployeeDetail />
        </Route>
      </Switch>
    </Router>
  );
});

test("renders employee number", async () => {
  const { getByText } = render(
    <Router initialEntries={["/admin/employees/1"]}>
      <Switch>
        <Route path="/admin/employees/:employeeId">
          <AdminEmployeeDetail />
        </Route>
      </Switch>
    </Router>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));

  expect(getByText(/employee #1/i)).toBeInTheDocument();
});
