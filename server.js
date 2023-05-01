const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const {v4: uuidv4} = require('uuid');
// Import inquirer app- TO DO

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'company_db'
    },
    console.log(`Connected to the company database.`)
);

// DEPARTMENTS
// View all departments
app.get('/api/departments', (req, res) => {
    var sqlQuery = 'SELECT * FROM departments';
    try{
        db.query(sqlQuery, (rows) => {
            res.json({
                message: "success",
                data: rows
            });
        })
    } catch(err){
        res.status(400).json({error: err.message});
    };
});

// Add departments
app.post('/api/new-department', ({body}, res) => {
    var sqlQuery = `INSERT INTO departments(name)
    VALUES(?)`;
    db.query(sqlQuery, body.name, (err, result) => {
        try{
            res.json({
                message: 'employee successfully added',
                data: req.body
            });
        } catch {
            res.status(400).json({error: err.message});
        }
    })
})


// ROLES
// View all roles
app.get('/api/roles', (req, res) => {
    var sqlQuery = 'SELECT * FROM roles';
    try{
        db.query(sqlQuery, (rows) => {
            res.json({
                message: "success",
                data: rows
            });
        })
    } catch(err){
        res.status(400).json({error: err.message});
    };
});

// Add role
app.post('/api/new-role', (req, res) => {
    var sqlQuery = `INSERT INTO roles(title, salary, department_id)
    VALUES(?, ?, ?)`;
    const {
        title,
        salary,
        department_id
        } = req.body;
    var params = [title, salary, department_id];
    db.query(sqlQuery, params, (err, result) => {
        try{
            res.json({
                message: 'employee successfully added',
                data: req.body
            });
        } catch {
            res.status(400).json({error: err.message});
        }
    })
})

// EMPLOYEES
// View all employees
app.get('/api/employees', (req, res) => {
    var sqlQuery = 'SELECT * FROM employees';
    try{
        db.query(sqlQuery, (rows) => {
            res.json({
                message: "success",
                data: rows
            });
        })
    } catch(err){
        res.status(400).json({error: err.message});
    };
});

// Add employee
app.post('/api/new-employee', (req, res) => {
    var sqlQuery = `INSERT INTO employees(first_name, last_name, role_id, manager_id)
    VALUES(?, ?, ?, ?)`;
    const {
        employee_firstname, 
        employee_lastname,
        employee_role,
        employee_manager
        } = req.body;
    var params = [employee_firstname, employee_lastname, employee_role, employee_manager];
    db.query(sqlQuery, params, (err, result) => {
        try{
            res.json({
                message: 'employee successfully added',
                data: req.body
            });
        } catch {
            res.status(400).json({error: err.message});
        }
    })
})

// Update employee role
app.put('/api/employees/:id', (req, res) => {
    const sqlQuery = `UPDATE employees SET role = ? WHERE id = ?`;
    const params = [req.body.role, req.params.id];
    db.query(sqlQuery, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });