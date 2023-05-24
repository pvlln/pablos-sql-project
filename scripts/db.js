const mysql = require("mysql2");

class CompanyDB {
  // Set constructor function to create connection to database
  constructor() {
    this.db = mysql.createConnection(
      {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "company_db",
      },
      console.log(`Connected to the company database.`)
    );
  }

  // DEPARTMENT FUNCTIONS
  // View all departments
  async getDepartments() {
    try {
      const sqlQuery = "SELECT * FROM departments;";
      const [departments] = await this.db.promise().query(sqlQuery);
      return departments;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // Add department
  async addDepartment({ name }) {
    try {
      const sqlQuery = `INSERT INTO departments(name) VALUES (?)`;
      const [result] = await this.db.promise().query(sqlQuery, name);
      return result;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // ROLE FUNCTIONS
  // View all roles
  async getRoles() {
    try {
      const sqlQuery = "SELECT * FROM roles";
      const [roles] = await this.db.promise().query(sqlQuery);
      return roles;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // Add new role
  async addRole({ role_name, salary, department_id }) {
    try {
      const sqlQuery = `INSERT INTO roles(title, salary, department_id) VALUES(?, ?, ?);`;
      const params = [role_name, salary, department_id];
      const [result] = await this.db.promise().query(sqlQuery, params);
      return "Role successfully added";
    } catch (error) {
      return "Unable to add role.";
    }
  }

  // EMPLOYEE FUNCTIONS
  // View all employees
  async getEmployees() {
    try {
      const sqlQuery = `SELECT eTable.id, CONCAT(eTable.first_name, ' ', eTable.last_name) as Name, roles.title as Role, roles.salary as Salary, dTable.name as "Department Name", CONCAT(mTable.first_name, ' ', mTable.last_name) as Manager
      FROM employees as eTable
      JOIN roles ON
          eTable.role_id = roles.id
      JOIN departments as dTable ON
          roles.department_id = dTable.id
      LEFT JOIN employees as mTable ON
          eTable.manager_id = mTable.id;`;
      const [employees] = await this.db.promise().query(sqlQuery);
      return employees;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // Add employee
  async addEmployee({ first_name, last_name, role_id, manager_id }) {
    try {
      const sqlQuery = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?);`;
      const params = [first_name, last_name, role_id, manager_id];
      const [result] = await this.db.promise().query(sqlQuery, params);
      return result;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // Update employee role
  async updateEmployee({ role_id, id }) {
    try {
      const sqlQuery = `UPDATE employees SET role_id = ? WHERE id = ?;`;
      const params = [role_id, id];
      const [result] = await this.db.promise().query(sqlQuery, params);
      return "Employee successfully updated.";
    } catch (error) {
      return "Problem updating employee.";
    }
  }
}

// Export company database class (set of functions)
module.exports = new CompanyDB();
