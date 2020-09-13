import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import camelcaseKeys from "camelcase-keys";

const API_DOMAIN = "http://localhost:5000";

interface IEmployee {
  id: number;
}

export function AdminHome() {
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);
  useEffect(() => {
    const url = `${API_DOMAIN}/employees/`;
    fetch(url)
      .then((response) => {
        if (response.status >= 400) throw new Error("error");
        return response.json();
      })
      .then((data) => {
        const employees = camelcaseKeys(data)
        setEmployees(employees);
      })
      .catch((e) => console.log(e));

    return () => {};
  }, []);

  if (!employees) return <div>loading...</div>;

  return (
    <div>
      <h1>Employees</h1>
      <button onClick={() => {
        const url = `${API_DOMAIN}/employees/`;
        const options: RequestInit = {
          method: "POST",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json'
          },
        }
        fetch(url, options)
          .then((response) => {
            console.log(response)
            if (response.status >= 400) throw new Error("error");
            return response.json();
          })
          .then((data) => {
            const employee = camelcaseKeys(data)
            setEmployees([...employees, employee]);
          })
          .catch((e) => console.log(e));
      }}>Add</button>
      <ul>
        {employees.map(({ id }) => (
          <li key={id}><Link to={`/admin/employees/${id}`}>{id}</Link></li>
        ))}
      </ul>
    </div>
  );
}
