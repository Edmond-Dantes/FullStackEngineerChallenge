import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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

export function EmployeeFeedbackDetail() {
  const { employeeId } = useContext(LoginContext);
  const history = useHistory();
  const { revieweeId, reviewId, feedbackId } = useParams();
  const cancelled = useRef(false);
  const [feedback, setFeedback] = useState<IPerformanceReviewFeedback | null>(
    null
  );
  const [newContent, setNewContent] = useState<string | null>(null);
  useEffect(() => {
    cancelled.current = false;
    const url = `${API_DOMAIN}/employees/${revieweeId}/performance_reviews/${reviewId}/performance_review_feedbacks/${feedbackId}`;
    fetch(url)
      .then((response) => {
        if (response.status >= 400) throw new Error("error");
        return response.json();
      })
      .then((data) => {
        const feedback = camelcaseKeys(data, { deep: true });
        if (!cancelled.current) setFeedback(feedback);
      })
      .catch((e) => console.log(e));

    return () => {
      cancelled.current = true;
    };
  }, [employeeId, feedbackId, revieweeId, reviewId]);

  const handleSubmitFeedback = () => {
    const url = `${API_DOMAIN}/employees/${revieweeId}/performance_reviews/${reviewId}/performance_review_feedbacks/${feedbackId}`;
    const data = {
      content: newContent
    }
    const options: RequestInit = {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    };
    fetch(url, options)
      .then((response) => {
        if (response.status >= 400) throw new Error("error");
        return response.json();
      })
      .then(() => {
        history.push("/")
      })
      .catch((e) => console.log(e));
  };

  if (!feedback) return <div>loading...</div>;

  const { content, pendingFeedback } = feedback;

  if (pendingFeedback)
    return (
      <div>
        <h1>Feedback for employee #{revieweeId}</h1>
        <h3>- Pending</h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmitFeedback()
          }}
        >
          <textarea
            style={{ resize: "none", width: 500, height: 300 }}
            value={newContent || ""}
            onChange={(event) => {
              setNewContent(event.target.value);
            }}
          />
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );

  return (
    <div>
      <h1>Feedback for employee #{feedback.revieweeId}</h1>
      <h3>- Completed</h3>
      <p>{content}</p>
    </div>
  );
}
