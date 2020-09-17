import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "../Home";
import { LoginContext } from "../../context";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const server = setupServer(
  rest.get(`${API_DOMAIN}/employees/1`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        performance_reviews: [],
        performance_review_feedbacks: [
          {
            id: 3,
            content: "nice guy",
            employee_id: 2,
            performance_review_id: 4,
            reviewee_id: 3,
            pending_feedback: false,
          },
        ],
      })
    );
  }),
  rest.get(`${API_DOMAIN}/employees/2`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 2,
        performance_reviews: [],
        performance_review_feedbacks: [
          {
            id: 3,
            content: null,
            employee_id: 1,
            performance_review_id: 4,
            reviewee_id: 3,
            pending_feedback: true,
          },
        ],
      })
    );
  }),
  rest.get(`${API_DOMAIN}/employees/999`, (req, res, ctx) => {
    return res(ctx.status(404), ctx.json(null));
  }),
  rest.get(`${API_DOMAIN}/employees/1000`, (req, res, ctx) => {
    return res(ctx.status(500), ctx.json(null));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders without crashing", () => {
  render(
    <LoginContext.Provider value={{ employeeId: 1, setEmployeeId: () => {} }}>
      <Home />
    </LoginContext.Provider>
  );
});

test("renders employee's completed assigned feedback", async () => {
  const { getByText, getAllByRole, debug } = render(
    <LoginContext.Provider value={{ employeeId: 1, setEmployeeId: () => {} }}>
      <Router initialEntries={["/"]}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </LoginContext.Provider>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));

  const listItems = getAllByRole("listitem");
  expect(listItems).toHaveLength(1);

  expect(listItems[0]).toHaveTextContent(/completed/i);
});

test("renders employee's pending assigned feedback", async () => {
  const { getByText, getAllByRole } = render(
    <LoginContext.Provider value={{ employeeId: 2, setEmployeeId: () => {} }}>
      <Router initialEntries={["/"]}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </LoginContext.Provider>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));

  const listItems = getAllByRole("listitem");
  expect(listItems).toHaveLength(1);

  expect(listItems[0]).toHaveTextContent(/pending/i);
});

test("renders not found error for non-existent employee", async () => {
  const { getByText } = render(
    <LoginContext.Provider value={{ employeeId: 999, setEmployeeId: () => {} }}>
      <Router initialEntries={["/"]}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </LoginContext.Provider>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));

  expect(getByText(/not found/i)).toBeInTheDocument();
});

test("renders generic error for error response statuses other than 404", async () => {
  const { getByText } = render(
    <LoginContext.Provider value={{ employeeId: 1000, setEmployeeId: () => {} }}>
      <Router initialEntries={["/"]}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </LoginContext.Provider>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));

  expect(getByText(/something went wrong/i)).toBeInTheDocument();
});
