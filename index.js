const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const questions = require("./scripts/questions");
const db = require("./scripts/db.js");
const { vary } = require("express/lib/response");
require("console.table");

async function runApp() {
  const { prompt } = await inquirer.prompt(questions.start);
  const departments = await db.getDepartments();
  const roles = await db.getRoles();
  const employees = await db.getEmployees();
  let message = "";
  switch (prompt) {
    case "View all employees":
      console.table(employees);
      break;
    case "Add employees":
      const employee_info = await inquirer.prompt(questions.newEmployee);
      const new_employee = await db.addEmployee(employee_info);
      console.log(new_employee);
      break;
    case "Update employee role":
      const employeeOptions = employees.map(({id, first_name, last_name}) => {
        return {name: `${first_name} ${last_name}`, value: id};
      })
      const roleOptions = roles.map(({id,title}) => {
        return {name: title, value: id};
      })
      const new_info = await inquirer.prompt(questions.updateEmployee(employeeOptions, roleOptions));
      message = await db.updateEmployee(new_info);
      console.log(message);
      break;
    case "View all roles":
      console.table(roles);
      break;
    case "Add roles":
      const deptChoices = departments.map(({id, name}) => {
        return { name, value: id };
      });
      const role_info = await inquirer.prompt(questions.newRole(deptChoices));
      message = await db.addRole(role_info);
      console.log(message);
    case "View all departments":
      console.table(departments);
      break;
    case "Add departments":
        const {name} = await inquirer.prompt(questions.newDepartment);
        const new_department = await db.addDepartment(name);
        console.log(new_department);
    case "Quit":
      process.exit(0);
  }
  runApp();
}

runApp();
