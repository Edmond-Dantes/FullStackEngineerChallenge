import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import { EmployeeFeedbackDetail } from "../EmployeeFeedbackDetail";
import { LoginContext } from "../../context";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const server = setupServer(
  rest.get(
    `${API_DOMAIN}/employees/2/performance_reviews/1/performance_review_feedbacks/1`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          content: "nice guy",
          employee_id: 1,
          performance_review_id: 1,
          reviewee_id: 2,
          pending_feedback: false,
        })
      );
    }
  ),
  rest.patch(
    `${API_DOMAIN}/employees/2/performance_reviews/1/performance_review_feedbacks/2`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          id: 1,
          content: null,
          employee_id: 1,
          performance_review_id: 1,
          reviewee_id: 2,
          pending_feedback: true,
        })
      );
    }
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders without crashing", () => {
  render(
    <LoginContext.Provider value={{ employeeId: 1, setEmployeeId: () => {} }}>
      <Router initialEntries={["/performance_review/2/1/1"]}>
        <Switch>
          <Route path="/performance_review/:revieweeId/:reviewId/:feedbackId">
            <EmployeeFeedbackDetail />
          </Route>
        </Switch>
      </Router>
    </LoginContext.Provider>
  );
});

test("renders a completed feedback", async () => {
  const { getByText } = render(
    <LoginContext.Provider value={{ employeeId: 1, setEmployeeId: () => {} }}>
      <Router initialEntries={["/performance_review/2/1/1"]}>
        <Switch>
          <Route path="/performance_review/:revieweeId/:reviewId/:feedbackId">
            <EmployeeFeedbackDetail />
          </Route>
        </Switch>
      </Router>
    </LoginContext.Provider>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));
  expect(getByText(/completed/i)).toBeInTheDocument();
});

test("renders a pending feedback", async () => {
  const { getByText } = render(
    <LoginContext.Provider value={{ employeeId: 2, setEmployeeId: () => {} }}>
      <Router initialEntries={["/performance_review/2/1/2"]}>
        <Switch>
          <Route path="/performance_review/:revieweeId/:reviewId/:feedbackId">
            <EmployeeFeedbackDetail />
          </Route>
        </Switch>
      </Router>
    </LoginContext.Provider>
  );

  await waitForElementToBeRemoved(() => getByText(/loading/i));
  expect(getByText(/pending/i)).toBeInTheDocument();
});
