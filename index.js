const inquirer = require("inquirer");
const fs = require("fs");
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
          {
            name: "View all departments",
            value: "View_all_departments",
          },
          {
            name: "View all roles",
            value: "View_all_roles",
          },
          {
            name: "View all employees",
            value: "View_all_employees",
          },
          {
            name: "Add a department",
            value: "Add_a_department",
          },
          {
            name: "Add a role",
            value: "Add_a_role",
          },
          {
            name: "Add an employee",
            value: "Add_an_employee",
          },
          {
            name: "Update an employee role",
            value: "Update_an_employee_role",
          },
          {
            name: "Quit",
            value: "QUIT_",
          },
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
    .then(() => {
      init();
    })
    .catch((err) => console.log(err));
}

function viewAllRoles() {
  //function that is invoked when choses viewAllDepts
  const sql =
    "SELECT *, department.name FROM role join department ON  department.id = role.department_id";
  db.promise()
    .query(sql)
    .then((result) => {
      // creating a callback funtion
      // if (err) return console.log(err);
      console.table(result); // this results contains rows returned by the server
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
    .then(([rows, _]) => {
      // creating a callback funtion
      // if (err) return console.log(err);
      console.table(rows);
      init();
    })
    .catch((err) => console.log(err));
}

//Adding department
function addDept() {
  inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What department would you like to add?",
      choices: [],
    },
  ]);
  const sql = "SELECT name FROM department";
  db.promise()
    .query(sql)
    .then(([rows, _]) => {
      console.table(rows);
      init();
    })
    .catch((err) => console.log(err));
}

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Please enter your title?",
      choices: [],
    },
    {
      type: "list",
      name: "department",
      message: "Which department are you from?",
      choices: [],
    },
    {
      type: "input",
      name: "salary",
      message: "Enter your salary",
    },
  ]);
  const sql = "SELECT name FROM department";
  db.promise()
    .query(sql)
    .then(([rows, _]) => {
      console.table(rows);
      init();
    })
    .catch((err) => console.log(err));
}

function addEmployee() {
  inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What department would you like to add?",
      choices: [],
    },
  ]);
  const sql = `SELECT Rol.id, Rol.title FROM role Rol; SELECT Emp.id, CONCAT(
    Emp.first_name, '', Emp.last_name) AS manager FROM employee E;
  )`;
  db.promise()
    .query(sql)
    .then(([rows, _]) => {
      console.table(rows);
      init();
    })
    .catch((err) => console.log(err));
}

function init() {
  inquirer.prompt([
    {
      type: "list",
      name: "firstName",
      message: "What is the employees first name",
      validate: (firstName) => {
        if (firstName) {
          return true;
        } else {
          console.log("Please enter the employees first name!");
          return false;
        }
      },
    },
    {
      type: "list",
      name: "lastName",
      message: "What is the employees last name",
      validate: (firstName) => {
        if (firstName) {
          return true;
        } else {
          console.log("Please enter the employees last name!");
          return false;
        }
      },
    },
    {
      type: "list",
      name: "role",
      message: "What is the employees role?",
      choices: titleChoices,
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the employees manager?",
      choices: managerChoices,
    },
  ]);
}

function addUpdateRole() {
  inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Which role do you want to update?",
      choices: roleChoices,
    },
    {
      type: "input",
      name: "title",
      message: "Enter the name of your title",
      validate: titleName => {
        if(titleName) {
          return true;
        } else {
          console.log('Please enter your title name');
        }
        }
      }
    },
    {
      type: "input",
      name: "salary",
      message: "Enter your salary",
    },
  ]);
  const sql = `SELECT roleUp.id, roleUp.title, roleUp.salary, roleUp.department_id FROM role R;`;
  db.promise()
    .query(sql)
    .then(([rows, _]) => {
      console.table(rows);
      init();
    })
    .catch((err) => console.log(err));
}
.then(() => promptMenu())

promptMenu();
