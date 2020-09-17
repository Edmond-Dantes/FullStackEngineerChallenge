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
import { AdminEmployeeDetail } from "../AdminEmployeeDetail";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const server = setupServer(
  rest.get(`${API_DOMAIN}/employees/1`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        performance_reviews: [{ id: 1, performance_review_feedbacks: [] }],
      })
    );
  }),
  rest.delete(`${API_DOMAIN}/employees/1`, (req, res, ctx) => {
    return res(
      ctx.json({})
    );
  }),
  rest.post(
    `${API_DOMAIN}/employees/1/performance_reviews`,
    (req, res, ctx) => {
      return res(ctx.json({ id: 2, performance_review_feedbacks: [] }));
    }
  )
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

test("navigates to admin top page after delete click", async () => {
  const { container, getByText, debug } = render(
    <Router initialEntries={["/admin/employees/1"]}>
      <Switch>
        <Route path="/admin/employees/:employeeId">
          <AdminEmployeeDetail />
        </Route>
        <Route path="/admin">
          <div>admin top</div>
        </Route>
      </Switch>
    </Router>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));
  await userEvent.click(getByText(/delete/i));
  await wait(() => {
    expect(container.innerHTML).toMatch(/admin top/i)
  });
});

test("renders new performance review on add click", async () => {
  const { getByText, getAllByRole } = render(
    <Router initialEntries={["/admin/employees/1"]}>
      <Switch>
        <Route path="/admin/employees/:employeeId">
          <AdminEmployeeDetail />
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
