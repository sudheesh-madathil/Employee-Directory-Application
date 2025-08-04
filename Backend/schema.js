const { gql } = require('apollo-server');

const typeDefs = gql`
  type Employee {
    _id: ID!
    name: String!
    position: String!
    department: Department!
    salary: Int!
  }

  type Department {
    _id: ID!
    name: String!
    floor: Int!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(_id: ID!): Employee
    getEmployeesByDepartment(departmentId: ID!): [Employee!]!
    getAllDepartments: [Department!]!
  }

  type Mutation {
    addEmployee(
      name: String!
      position: String!
      departmentId: ID!
      salary: Int!
    ): Employee
  }
`;

module.exports = { typeDefs };