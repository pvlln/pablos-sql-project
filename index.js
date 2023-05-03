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
        // use id- to do
      const new_info = await inquirer.prompt(questions.updateEmployee(roles));
      const update_employee = await db.updateEmployee(new_info);
      console.log(update_employee);
      break;
    case "View all roles":
      console.table(roles);
      break;
    case "Add roles":
      const role_info = await inquirer.prompt(questions.newRole(departments));
      const update_role = await db.addRole(role_info);
      console.log(update_role);
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
