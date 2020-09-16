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
import { AdminEmployeeReviewDetail } from "../AdminEmployeeReviewDetail";
import { debug } from "console";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const server = setupServer(
  rest.get(
    `${API_DOMAIN}/employees/1/performance_reviews/1`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          performance_review_feedbacks: [
            { id: 1, content: "test_content", employee_id: 2 },
          ],
        })
      );
    }
  ),
  rest.post(
    `${API_DOMAIN}/employees/1/performance_reviews/1/performance_review_feedbacks`,
    (req, res, ctx) => {
      const { reviewer_id } = req.body as { reviewer_id: string; }
      if (!reviewer_id)
        return res(
          ctx.status(400),
          ctx.json(null)
        );

      return res(ctx.json({ id: 2, content: "test_content", employee_id: reviewer_id }));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders without crashing", () => {
  render(
    <Router initialEntries={["/admin/employees/1/performance_reviews/1"]}>
      <Switch>
        <Route path="/admin/employees/:employeeId/performance_reviews/:reviewId">
          <AdminEmployeeReviewDetail />
        </Route>
      </Switch>
    </Router>
  );
});

test("renders performance review number", async () => {
  const { getByText } = render(
    <Router initialEntries={["/admin/employees/1/performance_reviews/1"]}>
      <Switch>
        <Route path="/admin/employees/:employeeId/performance_reviews/:reviewId">
          <AdminEmployeeReviewDetail />
        </Route>
      </Switch>
    </Router>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));

  expect(getByText(/Review #1/i)).toBeInTheDocument();
});

test("renders new performance review on add click", async () => {
  const { getByText, getByLabelText, getAllByRole } = render(
    <Router initialEntries={["/admin/employees/1/performance_reviews/1"]}>
      <Switch>
        <Route path="/admin/employees/:employeeId/performance_reviews/:reviewId">
          <AdminEmployeeReviewDetail />
        </Route>
      </Switch>
    </Router>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));
  await userEvent.type(getByLabelText(/reviewer/i), '3')
  expect(getByLabelText(/reviewer/i)).toHaveValue(3)
  await userEvent.click(getByText(/add/i));
  await wait(() => {
    const listItems = getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });
});
