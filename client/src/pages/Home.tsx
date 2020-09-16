import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import camelcaseKeys from "camelcase-keys";
import { LoginContext } from "../context";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

interface IPerformanceReviewFeedback {
  id: number;
  performanceReviewId: number;
  content: string;
  revieweeId: number;
  pendingFeedback: boolean;
}

interface IEmployee {
  id: number;
  performanceReviewFeedbacks: IPerformanceReviewFeedback[];
}

export function Home() {
  const { employeeId } = useContext(LoginContext);
  const cancelled = useRef(false);
  const [employee, setEmployee] = useState<IEmployee | null>(null);
  useEffect(() => {
    cancelled.current = false;
    const url = `${API_DOMAIN}/employees/${employeeId}`;
    fetch(url)
      .then((response) => {
        if (response.status >= 400) throw new Error("error");
        return response.json();
      })
      .then((data) => {
        const employee = camelcaseKeys(data, { deep: true });
        if (!cancelled.current) setEmployee(employee);
      })
      .catch((e) => console.log(e));

    return () => {
      cancelled.current = true;
    };
  }, [employeeId]);

  if (!employee) return <div>loading...</div>;

  return (
    <div>
      <h1>Employee #{employee.id}</h1>
      <ul>
        {employee.performanceReviewFeedbacks.map(
          ({ id, revieweeId, pendingFeedback, performanceReviewId }) => {
            if (pendingFeedback)
              return (
                <li key={id}>
                  <span>Pending feedback for employee #{revieweeId}</span>{" "}
                  <Link
                    to={`/performance_review/${revieweeId}/${performanceReviewId}/${id}`}
                  >
                    edit
                  </Link>
                </li>
              );

            return (
              <li key={id}>
                <span>Feedback for employee #{revieweeId} completed</span>{" "}
                <Link
                  to={`/performance_review/${revieweeId}/${performanceReviewId}/${id}`}
                >
                  view
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
