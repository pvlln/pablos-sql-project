const questions = {
  // Start inquirer app
  start: [
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "Add employees",
        "Update employee role",
        "View all roles",
        "Add roles",
        "View all departments",
        "Add departments",
        "Quit",
      ],
      name: "prompt",
    },
  ],
  // Questions asked if user selects "add employee"
  newEmployee: [
    {
      type: "input",
      message: "Enter the first name of the new employee",
      name: "first_name",
    },
    {
      type: "input",
      message: "Enter the last name of the new employee",
      name: "last_name",
    },
    {
      type: "input",
      message: "Enter the role id",
      name: "role_id",
    },
    {
      type: "input",
      message: "Enter the manager id",
      name: "manager_id",
    },
  ],
  // Questions asked if user selects "update employee"
  updateEmployee: (employees, roles) => {
    return [
      {
        type: "list",
        message: "Select the employee you want to update",
        name: "id",
        choices: employees
      },
      {
        type: "list",
        message: "Assign a new role for this employee",
        choices: roles,
        name: "role_id",
      },
    ];
  },
  // Questions asked if user selects "add role"
  newRole: (departments) => {
    return [
      {
        type: "input",
        message: "Enter the name of the role",
        name: "role_name",
      },
      {
        type: "input",
        message: "Enter the salary for this role",
        name: "salary",
      },
      {
        type: "list",
        message: "Which department does this role belong to?",
        choices: departments,
        name: "department_id",
      },
    ];
  },
  // Questions asked if user selects "add department"
  newDepartment: [
    {
      type: "input",
      message: "Enter the name of the department",
      name: "name",
    },
  ],
};

module.exports = questions;