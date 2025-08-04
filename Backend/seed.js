const { connectToDatabase } = require('./db');
const { ObjectId } = require('mongodb');

async function seedData() {
    const db = await connectToDatabase();
    
    await db.collection('departments').deleteMany({});
    await db.collection('employees').deleteMany({});

    const departments = [
        { _id: new ObjectId(), name: 'Engineering', floor: 4 },
        { _id: new ObjectId(), name: 'Marketing', floor: 2 },
        { _id: new ObjectId(), name: 'Human Resources', floor: 1 },
    ];
    await db.collection('departments').insertMany(departments);

    const employees = [
        { name: 'Alice Smith', position: 'Software Engineer', departmentId: departments[0]._id, salary: 90000 },
        { name: 'Bob Johnson', position: 'Product Manager', departmentId: departments[1]._id, salary: 85000 },
        { name: 'Charlie Brown', position: 'HR Manager', departmentId: departments[2]._id, salary: 75000 },
        { name: 'Diana Prince', position: 'Marketing Specialist', departmentId: departments[1]._id, salary: 65000 },
        { name: 'Steve Rogers', position: 'Senior Developer', departmentId: departments[0]._id, salary: 110000 },
    ];
    await db.collection('employees').insertMany(employees);

    console.log("Database seeded successfully!");
    
    // Disconnect from the database
    process.exit(0);
}

seedData();