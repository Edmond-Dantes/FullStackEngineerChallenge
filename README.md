# Take-home Coding Challenge Submission
This is a partial solution to the [coding challenge](./docs/challenge-spec.md)

## High level description of design
This web application allows employees to submit feedback toward each other's performance review. There are two main entry points of hte web app, an employee and an admin home.

### Page routes
- Employee
  - / *(entry)*
  - /performance_review/:revieweeId/:reviewId/:feedbackId
- Admin
  - /admin *(entry)*
  - /admin/employees/:employeeId
  - /admin/employees/:employeeId/performance_reviews/:reviewId

## Technologies used

### Server side API
- Ruby on Rails API
- SQLite

### Web app
- React (Create React App with Typescript)

## Assumptions made
Given limited requirements, this app attempts to meet the minimum requirements, but here are the assumptions made that affect the design and architecture of the app.

- Employees can be referred to by database record id acting as an employee number.
- Only employees participate (give performance feedback) in reviews, not an admin.
- Employees can only submit feedback once for each admin assignment.

## Quick start

### Run API server

*api/ directory*
```
bundle install
rails s -p 5000
```

### Run React app

*client/ directory*
```
npm install
npm start
```

Then open http://localhost:3000/ to see the app.

## Testing

### Run API server tests

*api/ directory*
```
rspec
```

### Run React app tests

*api/ directory*
```
npm test
```

## Additional documentation
docs/ directory