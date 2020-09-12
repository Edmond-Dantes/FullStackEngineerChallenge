# Data Model

### Employees
*An employee*
- id: integer

### PerformanceReviews
*A performance review*
- id: integer
- employee_id: integer

### PerformanceReviewFeedback
*Feedback from an employee toward a performance review* 
- id: integer
- performance_review_id: integer
- employee_id: integer
- content: text

### PerformanceReviewFeedbackAssignment
*Assigns an employee to participate in a performance review* 
- id: integer
- performance_review_id: integer
- employee_id: integer