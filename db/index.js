const connection = require('./connection');

class DB {

    constructor(connection) {
        this.connection = connection;
    }
    //create a new employee
    newEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }
    //delete an employee
    deleteEmployee(employeeId) {
        return this.connection.query("DELETE FROM employee WHERE id = ?", employeeId);
    }
    // Find all employees and their data
    findEmployees() {
        return this.connection.query("SELECT * FROM employee");
    }
    //Create role
    createRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
    }
    //update an employees role
    updateRole(employeeId, roleId) {
        return this.connection.query("UPDATE employee SET role_id = ?", [roleId, employeeId]);
    }
    // Find Roles
    findRoles() {
        return this.connection.query("SELECT * FROM role");
    }
    // Create department
    newDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", department);
    }
    // Find all departments
    findDepartments() {
        return this.connection.query("SELECT * FROM department");
    }
}

module.exports = new DB(connection);