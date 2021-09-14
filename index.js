const { prompt } = require("inquirer");
const db = require("./db");
//shows data table with employees to start
require("console.table");

// init();
// // calls the questions function and starts prompts
// function init() {
  
// }
questions();

// Load the prompts/questions
async function questions() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All Departments",
          value: "ALL_DEPARTMENTS"
        },
        {
          name: "View All Roles",
          value: "ALL_ROLES"
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee's Role",
          value: "UPDATE_EMP_ROLE"
        },
        {
          name: "Delete an Employee",
          value: "REMOVE_EMPLOYEE"
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE"
        },
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]);

  // Call the appropriate function depending on what the user chose
  switch (choice) {
    case "VIEW_EMPLOYEES":
      return allEmployees();
    case "ALL_DEPARTMENTS":
      return allDepartments();
    case "ALL_ROLES":
      return allRoles();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "UPDATE_EMP_ROLE":
      return updateEmpRole();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "REMOVE_EMPLOYEE":
      return removeEmployee();
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "ADD_ROLE":
      return addRole();
    case "ADD_DEPARTMENT":
      return addDepartment();
    default:
      return quit();
  }
}
//find all employees
async function allEmployees() {
    const employees = await db.findEmployees();
  
    console.log("\n");
    console.table(employees);
  
    questions();
}
//find all departments
async function allDepartments() {
    const department = await db.findDepartments();
  
    console.log("\n");
    console.table(department);
  
    questions();
}
//find all roles
async function allRoles() {
    const roles = await db.findRoles();
  
    console.log("\n");
    console.table(roles);
  
    questions();
}
//add employee
async function addEmployee() {
    const roles = await db.findRoles();
    const employees = await db.findEmployees();
  
    const employee = await prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "What is the employee's role?",
      choices: roleChoices
    });
  
    employee.role_id = roleId;
  
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "Who is the employee's manager?",
      choices: managerChoices
    });
  
    employee.manager_id = managerId;
  
    await db.newEmployee(employee);
  
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to the database`
    );
  
    questions();
}
// delete employee
async function removeEmployee() {
    const employees = await db.findEmployees();
  
    const empChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: empChoices
      }
    ]);
  
    await db.deleteEmployee(employeeId);
  
    console.log("Removed employee from the database");
  
    questions();
  
}
//update role
async function updateEmpRole() {
    const employees = await db.findEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      }
    ]);
  
    const roles = await db.findRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to assign the selected employee?",
        choices: roleChoices
      }
    ]);
  
    await db.updateRole(employeeId, roleId);
  
    console.log("Updated employee's role");
  
    questions();
}
// add role
async function addRole() {
    const departments = await db.findDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      {
        name: "title",
        message: "What is the name of the role?"
      },
      {
        name: "salary",
        message: "What is the salary of the role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices
      }
    ]);
  
    await db.createRole(role);
  
    console.log(`Added ${role.title} to the database`);
  
    questions();
}
// new department
async function addDepartment() {
    const department = await prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ]);
  
    await db.newDepartment(department);
  
    console.log(`Added ${department.name} to the database`);
  
    questions();
}
function quit() {
    console.log("Bye for now!");
    process.exit();
}