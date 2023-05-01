const questions = [
    {
        type: "list",
        message: 'What would you like to do?',
        choices: ["View all employees", "Add employees", "Update employee role", "View all roles", 
        "Add roles", "View all departments", "Add departments", "Quit"],
        name: "Prompt",
    },
    {
        type: "input",
        message: "Enter the first name of the new employee",
        name: "first_name"
    },
    {
        type: "input",
        message: "Enter the last name of the new employee",
        name: "last_name"
    },
    {
        type: "input",
        message: "Enter the role id",
        name: "role_id"
    },
    {
        type: "input",
        message: "Enter the manager id",
        name: "manager_id"
    },
    {
        type: "input",
        message: "Enter the name of the role",
        name: "role_name"
    },
    {
        type: "input",
        message: "Enter the salary for this role",
        name: "salary"
    },
    {
        type: "input",
        message: "Which department does this role belong to? (Enter the department ID)",
        name: "department_id"
    },
    {
        type: "input",
        message: "Enter the name of the department",
        name: "department_name"
    },
]
