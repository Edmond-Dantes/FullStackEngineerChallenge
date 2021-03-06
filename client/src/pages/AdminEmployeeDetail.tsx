import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import camelcaseKeys from "camelcase-keys";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

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
  const cancelled = useRef(false);
  const { employeeId } = useParams();
  const history = useHistory();
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
        const employee: IEmployee = camelcaseKeys(data);
        if (!cancelled.current) {
          setEmployee(employee);
        }
      })
      .catch((e) => console.log(e));

    return () => {
      cancelled.current = true;
    };
  }, [employeeId]);

  const handleDelete = () => {
    const url = `${API_DOMAIN}/employees/${employeeId}`;
    const options: RequestInit = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((response) => {
        if (response.status >= 400) throw new Error("error");
        return response.json();
      })
      .then(() => {
        history.push("/admin");
      })
      .catch((e) => console.log(e));
  };

  const handleAdd = () => {
    const url = `${API_DOMAIN}/employees/${employeeId}/performance_reviews`;
    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((response) => {
        if (response.status >= 400) throw new Error("error");
        return response.json();
      })
      .then((data: IPerformanceReview) => {
        const performanceReview: IPerformanceReview = camelcaseKeys(data);
        const currentPerformanceReviews = employee?.performanceReviews || [];
        if (!cancelled.current)
          setEmployee({
            id: employeeId,
            performanceReviews: [
              ...currentPerformanceReviews,
              performanceReview,
            ],
          });
      })
      .catch((e) => console.log(e));
  };

  if (!employee) return <div>loading...</div>;

  const { performanceReviews } = employee;

  return (
    <div>
      <Link to="/admin">back</Link>
      <h1>Employee #{employeeId}</h1>
      <button onClick={handleDelete}>Delete</button>
      <h2>Performance Reviews</h2>
      <button onClick={handleAdd}>Add</button>
      <ul>
        {performanceReviews.map(
          ({ id: reviewId, performanceReviewFeedbacks }) => {
            const feedbackCount = performanceReviewFeedbacks?.length || 0;
            return (
              <li key={reviewId}>
                <Link
                  to={`/admin/employees/${employeeId}/performance_reviews/${reviewId}`}
                >
                  {reviewId}
                </Link>{" "}
                - {feedbackCount}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
