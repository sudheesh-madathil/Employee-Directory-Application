import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE, GET_ALL_EMPLOYEES } from '../graphql/queries';

const EmployeeForm = ({ departments }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [salary, setSalary] = useState('');

  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [
      { query: GET_ALL_EMPLOYEES }, // Refresh the employee list after adding
      'GetAllEmployees'
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !position || !departmentId || !salary) {
      alert('All fields are required!');
      return;
    }

    try {
      await addEmployee({
        variables: {
          name,
          position,
          departmentId,
          salary: parseInt(salary),
        },
      });
      // Clear form
      setName('');
      setPosition('');
      setDepartmentId('');
      setSalary('');
      alert('Employee added successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h3>Add New Employee</h3>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Position:</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
      </div>
      <div>
        <label>Department:</label>
        <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
          <option value="">--Select Department--</option>
          {departments.map(dept => (
            <option key={dept._id} value={dept._id}>{dept.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Salary:</label>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Employee'}
      </button>
      {error && <p className="error">Error adding employee: {error.message}</p>}
    </form>
  );
};

export default EmployeeForm;