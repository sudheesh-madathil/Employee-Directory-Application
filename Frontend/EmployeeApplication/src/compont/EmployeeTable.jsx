import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeTable = ({ employees }) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.position}</td>
            <td>{employee.department?.name}</td>
            <td>
              <Link to={`/employee/${employee._id}`}>View Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;