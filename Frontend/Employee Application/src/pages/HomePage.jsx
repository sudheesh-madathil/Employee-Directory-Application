import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES, GET_ALL_DEPARTMENTS } from '../graphql/queries';
import EmployeeTable from '../compont/EmployeeTable';
import EmployeeForm from '../compont/EmployeeForm';

const HomePage = () => {
  const { loading: employeesLoading, error: employeesError, data: employeesData } = useQuery(GET_ALL_EMPLOYEES);
  const { loading: departmentsLoading, error: departmentsError, data: departmentsData } = useQuery(GET_ALL_DEPARTMENTS);

  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    if (employeesData) {
      if (selectedDepartment === 'all') {
        setFilteredEmployees(employeesData.getAllEmployees);
      } else {
        const filtered = employeesData.getAllEmployees.filter(
          (emp) => emp.department._id === selectedDepartment
        );
        setFilteredEmployees(filtered);
      }
    }
  }, [employeesData, selectedDepartment]);

  if (employeesLoading || departmentsLoading) return <p>Loading...</p>;
  if (employeesError) return <p>Error fetching employees: {employeesError.message}</p>;
  if (departmentsError) return <p>Error fetching departments: {departmentsError.message}</p>;

  return (
    <div className="container">
      <h1>Employee Directory</h1>
      <div className="filter-controls">
        <label>Filter by Department:</label>
        <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option value="all">All Departments</option>
          {departmentsData.getAllDepartments.map(dept => (
            <option key={dept._id} value={dept._id}>{dept.name}</option>
          ))}
        </select>
      </div>

      <EmployeeTable employees={filteredEmployees} />
      <EmployeeForm departments={departmentsData.getAllDepartments} />
    </div>
  );
};

export default HomePage;