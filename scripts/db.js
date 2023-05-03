const mysql = require("mysql2");

class CompanyDB {
  // Set constructor function to create connection to database
  constructor() {
    this.db = mysql.createConnection(
      {
        host: "127.0.0.1",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      console.log(`Connected to the company database.`)
    );
  }

  // DEPARTMENT FUNCTIONS
  // View all departments
  async getDepartments() {
    try {
      const sqlQuery = "SELECT * FROM departments";
      const [departments] = await this.db.promise().query(sqlQuery);
      return departments;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // Add department
  async addDepartment(department_name) {
    try {
      const sqlQuery = `INSERT INTO departments(department_name) VALUES(?)`;
      const [result] = await this.db.promise().query(sqlQuery, department_name);
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
  async addRole({ title, salary, department_id }) {
    try {
      const sqlQuery = `INSERT INTO roles(title, salary, department_id) VALUES(?, ?, ?)`;
      const params = [title, salary, department_id];
      const [result] = await this.db.promise().query(sqlQuery, params);
      return [result, { ...req.body, id: result.insertId }];
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // EMPLOYEE FUNCTIONS
  // View all employees
  async getEmployees() {
    try {
      const sqlQuery = "SELECT * FROM employees";
      const [employees] = await this.db.promise().query(sqlQuery);
      return employees;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // Add employee
  async addEmployee({first_name, last_name,role_id, manager_id}) {
      try {
          const sqlQuery = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
          const params = [first_name, last_name, role_id, manager_id];
          const [result] = await this.db.promise().query(sqlQuery, params);
          return result;
      } catch (error) {
          console.log(error);
          return;
      }
  }

  // Update employee role
  async updateEmployee({role_id, id}) {
      try {
        const sqlQuery = `UPDATE employees SET role_id = ? WHERE id = ?`;
        const params = [role_id, id];
        const [result] = await this.db.promise().query(sqlQuery, params);
        return result;
      } catch (error) {
        console.log(error);
        return;
      }
  }
}

// Export company database class (set of functions)
module.exports = new CompanyDB();
