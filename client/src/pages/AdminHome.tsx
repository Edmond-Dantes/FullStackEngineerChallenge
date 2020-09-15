import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import camelcaseKeys from "camelcase-keys";

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

interface IEmployee {
  id: number;
}

export function AdminHome() {
  const cancelled = useRef(false);
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);
  useEffect(() => {
    cancelled.current = false;
    const url = `${API_DOMAIN}/employees/`;
    fetch(url)
      .then((response) => {
        if (response.status >= 400) throw new Error("error");
        return response.json();
      })
      .then((data) => {
        const employees = camelcaseKeys(data);
        if (!cancelled.current) setEmployees(employees);
      })
      .catch((e) => console.log(e));

    return () => {
      cancelled.current = true;
    };
  }, []);

  const handleAdd = () => {
    const url = `${API_DOMAIN}/employees/`;
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
      .then((data) => {
        const employee = camelcaseKeys(data);
        if (!cancelled.current) {
          const currentEmployees = employees || []
          setEmployees([...currentEmployees, employee]);
        }
      })
      .catch((e) => console.log(e));
  };

  if (!employees) return <div>loading...</div>;

  return (
    <div>
      <h1>Employees</h1>
      <button onClick={handleAdd}>Add</button>
      <ul>
        {employees.map(({ id }) => (
          <li key={id}>
            <Link to={`/admin/employees/${id}`}>{id}</Link>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
