import React from 'react'

interface ILoginContext {
  employeeId: number | null;
  setEmployeeId: (employeeId: number) => void;
}

export const LoginContext = React.createContext<ILoginContext>({
  employeeId: null,
  setEmployeeId: () => {},
});