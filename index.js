const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const questions = require('./scripts/inquire');
const db = require('./scripts/db.js');
require('console.table');

