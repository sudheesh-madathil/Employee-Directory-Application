import { gql } from '@apollo/client';

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      _id
      name
      position
      department {
        _id
        name
      }
    }
  }
`;

export const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($_id: ID!) {
    getEmployeeDetails(_id: $_id) {
      _id
      name
      position
      salary
      department {
        _id
        name
        floor
      }
    }
  }
`;

export const GET_ALL_DEPARTMENTS = gql`
  query GetAllDepartments {
    getAllDepartments {
      _id
      name
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $position: String!, $departmentId: ID!, $salary: Int!) {
    addEmployee(name: $name, position: $position, departmentId: $departmentId, salary: $salary) {
      _id
      name
      position
      department {
        name
      }
    }
  }
`;