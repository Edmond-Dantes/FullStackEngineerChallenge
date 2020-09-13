import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import camelcaseKeys from "camelcase-keys";

const API_DOMAIN = "http://localhost:5000";

interface IPerformanceReviewFeedback {
  id: number;
  content: string;
}

interface IPerformanceReview {
  id: number;
  performanceReviewFeedbacks: IPerformanceReviewFeedback[];
}

interface IEmployee {
  id: number;
  performanceReviews: IPerformanceReview[];
}

export function AdminEmployeeDetail() {
  const { employeeId } = useParams();
  console.log(employeeId);
  const [employee, setEmployee] = useState<IEmployee | null>(null);
  useEffect(() => {
    const url = `${API_DOMAIN}/employees/${employeeId}`;
    fetch(url)
      .then((response) => {
        if (response.status >= 400) throw new Error("error");
        return response.json();
      })
      .then((data) => {
        const employee: IEmployee = camelcaseKeys(data);
        setEmployee(employee);
      })
      .catch((e) => console.log(e));

    return () => {};
  }, [employeeId]);

  if (!employee) return <div>loading...</div>;

  const { performanceReviews } = employee;

  return (
    <div>
      <Link to="/admin">back</Link>
      <h1>Employee #{employeeId}</h1>
      <h2>Performance Reviews</h2>
      <button onClick={() => {}}>Add</button>
      <ul>
        {performanceReviews.map(
          ({ id: reviewId, performanceReviewFeedbacks }) => (
            <li>
              {reviewId} {performanceReviewFeedbacks.length.toString()}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
