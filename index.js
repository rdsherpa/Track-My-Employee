const inquirer = require("inquirer");
const db = require("./config/connection");
require("console.table");

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          // console.log("You want to View all departments");
          viewAllDepts(); // invoking viewAllDepts function
          init(); //I wanted user to prompt again, until user hits 'Quit'
          break;
        case "View all roles":
          console.log("You want to View all roles");
          init();
          break;
        case "View all employees":
          console.log("You want to View all employees ");
          init();
          break;
        case "Add a department":
          console.log("You want to Add a department");
          init();
          break;
        case "Add a role":
          console.log("You want to Add a role");
          init();
          break;
        case "Add an employee":
          console.log("You want to Add an employee");
          init();
          break;
        case "Update an employee role":
          console.log("You want to View all departments");
          init();
          break;
        default:
          process.exit();
      }
    })
    .catch((err) => console.log(err));
}
init();

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// function viewAllDepts() {
//function that is invoked when choses viewAllDepts
// const sql = "SELECT * FROM  department";
// db.query(sql, (err, result) => {
// creating a callback funtion
//     if (err) return console.log(err);
//     console.table(result);
//     init();
//   });
// }

function viewAllDepts() {
  //function that is invoked when choses viewAllDepts
  const sql = "SELECT * FROM  department";
  db.promise()
    .query(sql)
    .then((result) => {
      // creating a callback funtion
      // if (err) return console.log(err);
      console.table(result);
      init();
    })
    .catch((err) => console.log(err));
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

function viewAllEmps() {
  //function that is invoked when choses ViewAllEmps
  const sql = `SELECT emp.id, emp.first_name, emp.last_name, title, salary, CONCAT (mgr.first_name, '', mgr.last_name) AS manager
                FROM employee emp
                LEFT JOIN employee mgr ON mgr.id = emp.manager_id
                LEFT JOIN role ON emp.role_id = role.id;
                LEFT JOIN department ON role.department_id = department.id;`;
  db.promise()
    .query(sql)
    .then((result) => {
      // creating a callback funtion
      // if (err) return console.log(err);
      console.table(result);
      init();
    })
    .catch((err) => console.log(err));
}
