import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import camelcaseKeys from "camelcase-keys";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

interface IPerformanceReviewFeedback {
  id: number;
  content: string;
  employeeId: number;
}

interface IPerformanceReview {
  id: number;
  performanceReviewFeedbacks: IPerformanceReviewFeedback[];
}

export function AdminEmployeeReviewDetail() {
  const cancelled = useRef(false);
  const { employeeId, reviewId } = useParams();
  const [
    performanceReview,
    setPerformanceReview,
  ] = useState<IPerformanceReview | null>(null);
  const [reviewerId, setReviewerId] = useState<number | null>(null);
  useEffect(() => {
    cancelled.current = false;
    const url = `${API_DOMAIN}/employees/${employeeId}/performance_reviews/${reviewId}`;
    fetch(url)
      .then((response) => {
        if (response.status >= 400) throw new Error("error");
        return response.json();
      })
      .then((data) => {
        const performanceReview: IPerformanceReview = camelcaseKeys(data, {deep: true});
        if (!cancelled.current) {
          setPerformanceReview(performanceReview);
        }
      })
      .catch((e) => console.log(e));

    return () => {
      cancelled.current = true;
    };
  }, [employeeId, reviewId]);

  const handleAdd = () => {
    const url = `${API_DOMAIN}/employees/${employeeId}/performance_reviews/${reviewId}/performance_review_feedbacks`;
    const data = {
      reviewer_id: reviewerId,
    };
    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(url, options)
      .then((response) => {
        if (response.status >= 400) throw new Error("error");
        return response.json();
      })
      .then((data: IPerformanceReviewFeedback) => {
        const performanceReviewFeedback: IPerformanceReviewFeedback = camelcaseKeys(
          data
        );
        const currentPerformanceReviewFeedbacks =
          performanceReview?.performanceReviewFeedbacks || [];
        if (!cancelled.current) {
          setPerformanceReview({
            id: reviewId,
            performanceReviewFeedbacks: [
              ...currentPerformanceReviewFeedbacks,
              performanceReviewFeedback,
            ],
          });
          setReviewerId(null);
        }
      })
      .catch((e) => console.log(e));
  };

  if (!performanceReview) return <div>loading...</div>;

  const { performanceReviewFeedbacks } = performanceReview;

  return (
    <div>
      <Link to={`/admin/employees/${employeeId}`}>back</Link>
      <h1>
        Employee #{employeeId} - Performance Review #{reviewId}
      </h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="reviewer-id">Reviewer's employee id</label>
        <input
          id="reviewer-id"
          type="number"
          value={reviewerId || ""}
          onChange={(event) => {
            const reviewerId = Number(event.target.value);
            setReviewerId(reviewerId);
          }}
        ></input>
        <button onClick={handleAdd}>Add</button>
      </form>
      <ul>
        {performanceReviewFeedbacks.map(
          ({ id: feedbackId, content, employeeId: reviewerId }) => {
            return (
              <li key={feedbackId}>
                {feedbackId} -{" "}
                {content || `pending feedback from employee #${reviewerId}`}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
