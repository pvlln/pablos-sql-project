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
        name: "employee_firstname"
    },
    {
        type: "input",
        message: "Enter the last name of the new employee",
        name: "employee_lastname"
    },
    {
        type: "input",
        message: "Enter the role id",
        name: "employee_role"
    },
    {
        type: "input",
        message: "Enter the manager id",
        name: "employee_manager"
    }

]