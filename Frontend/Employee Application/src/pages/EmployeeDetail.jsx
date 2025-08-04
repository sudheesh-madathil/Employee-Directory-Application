import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEE_DETAILS } from '../graphql/queries';

const EmployeeDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { _id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.getEmployeeDetails) return <p>Employee not found!</p>;

  const employee = data.getEmployeeDetails;

  return (
    <div className="container employee-detail">
      <h1>Employee Details</h1>
      <div>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Salary:</strong> ${employee.salary}</p>
        <p><strong>Department:</strong> {employee.department.name} (Floor: {employee.department.floor})</p>
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default EmployeeDetail;