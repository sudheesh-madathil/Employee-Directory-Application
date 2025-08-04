const { ObjectId } = require('mongodb');

const resolvers = {
    Query: {
        getAllEmployees: async (parent, args, { db }) => {
            const employees = await db.collection('employees').find().toArray();
            return employees.map(emp => ({
                ...emp,
                department: db.collection('departments').findOne({ _id: emp.departmentId })
            }));
        },
        getEmployeeDetails: async (parent, { _id }, { db }) => {
            const employee = await db.collection('employees').findOne({ _id: new ObjectId(_id) });
            if (!employee) {
                throw new Error('Employee not found');
            }
            return {
                ...employee,
                department: db.collection('departments').findOne({ _id: employee.departmentId })
            };
        },
        getEmployeesByDepartment: async (parent, { departmentId }, { db }) => {
            const employees = await db.collection('employees').find({ departmentId: new ObjectId(departmentId) }).toArray();
            return employees.map(emp => ({
                ...emp,
                department: db.collection('departments').findOne({ _id: emp.departmentId })
            }));
        },
        getAllDepartments: async (parent, args, { db }) => {
            return await db.collection('departments').find().toArray();
        },
    },

    Mutation: {
        addEmployee: async (parent, { name, position, departmentId, salary }, { db }) => {
            const newEmployee = {
                name,
                position,
                departmentId: new ObjectId(departmentId),
                salary,
            };
            const result = await db.collection('employees').insertOne(newEmployee);
            
            return {
                ...newEmployee,
                _id: result.insertedId,
                department: db.collection('departments').findOne({ _id: new ObjectId(departmentId) })
            };
        },
    },
};

module.exports = { resolvers };