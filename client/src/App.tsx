import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  useHistory,
} from "react-router-dom";
import {
  AdminHome,
  AdminEmployeeDetail,
  AdminEmployeeReviewDetail,
  EmployeeFeedbackDetail,
  Home,
} from "./pages";
import { LoginContext } from "./context";

function App() {
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  return (
    <LoginContext.Provider value={{ employeeId, setEmployeeId }}>
      <div className="App">
        <Router>
          <Switch>
            <EmployeeRoute exact path="/">
              <Home />
            </EmployeeRoute>
            <EmployeeRoute path="/performance_review/:revieweeId/:reviewId/:feedbackId">
              <EmployeeFeedbackDetail />
            </EmployeeRoute>
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
    </LoginContext.Provider>
  );
}

const EmployeeRoute: React.FC<RouteProps> = (props) => {
  const { employeeId, setEmployeeId } = useContext(LoginContext);
  const [loginValue, setLoginValue] = useState("");
  const history = useHistory();

  if (employeeId) return <Route {...props} />;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const employeeId = Number(loginValue);
        setEmployeeId(employeeId);
        history.push("/")
      }}
    >
      <input
        value={loginValue}
        onChange={(event) => {
          const value = event.target.value;
          setLoginValue(value);
        }}
      />
      <button>Login</button>
    </form>
  );
};

export default App;
