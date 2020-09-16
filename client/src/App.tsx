import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  AdminHome,
  AdminEmployeeDetail,
  AdminEmployeeReviewDetail,
} from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/admin">
            <AdminHome />
          </Route>
          <Route path="/admin/employees/:employeeId/performance_reviews/:reviewId">
            <AdminEmployeeReviewDetail />
          </Route>
          <Route path="/admin/employees/:employeeId">
            <AdminEmployeeDetail />
          </Route>
          <Route path="*">
            <div>404</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
