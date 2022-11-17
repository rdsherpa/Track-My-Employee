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
        case "View_all_departments":
          // console.log("You want to View all departments");
          viewAllDepts(); // invoking viewAllDepts function
          // init(); //I wanted user to prompt again, until user hits 'Quit'
          break;
        case "View_all_roles":
          console.log("You want to View all roles");
          viewAllRoles();
          break;
        case "View_all_employees":
          console.log("You want to View all employees ");
          viewAllEmps();
          break;
        case "Add_a_department":
          console.log("You want to Add a department");
          addDept();
          break;
        case "Add_a_role":
          console.log("You want to Add a role");
          addRole();
          break;
        case "Add_an_employee":
          console.log("You want to Add an employee");
          addEmployee();
          break;
        case "Update_an_employee_role":
          console.log("You want to View all departments");
          addUpdateRole();
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
    .then(([result], err) => {
      // creating a callback funtion

      if (err) return console.log(err);
      console.table(result);
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
    .then(([result], err) => {
      // creating a callback funtion
      if (err) return console.log(err);
      console.table(result); // this results contains rows returned by the server
      init();
    })
    .catch((err) => console.log(err));
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

function viewAllEmps() {
  console.log("In VIEW EMPLOYEES function");
  //function that is invoked when choses ViewAllEmps
  //const sql_simple = "SELECT * FROM employee;";
  const sql = `SELECT emp.id, emp.first_name, emp.last_name, title, salary, CONCAT (mgr.first_name, '', mgr.last_name) AS manager FROM employee as emp LEFT JOIN employee mgr ON mgr.id = emp.manager_id LEFT JOIN role ON emp.role_id = role.id LEFT JOIN department ON role.department_id = department.id;`;

  db.promise()
    //.query(sql_simple)
    .query(sql)
    .then(([result], err) => {
      // creating a callback funtion
      if (err) return console.log(err);
      console.table(result);
      init();
    })
    .catch((err) => console.log(err));
}

//Adding department
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What department would you like to add?",
        validate: (departmentName) => {
          if (departmentName) {
            return true;
          } else {
            console.log("Please enter the name of your department!");
          }
        },
      },
    ])
    .then((name) => {
      connection.promise().query("INSERT INTO department SET?", name);
      selectDepartments();
    });
}

function addRole() {
  /*  db.query("SELECT departmet.id, department.name FROM department;", function(err, data) {
    if(err) {
      console.log(err);
    }
    console.log(data)
  });
  */

  db.promise()
    .query("SELECT id, name FROM department;")
    .then(([departments]) => {
      console.log(departments);
      let departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      // this is our SECOND ASYNC request (dependant on data from the FIRST ASYNC request --> to our database)
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Please enter your title?",
            validate: (titleName) => {
              if (titleName) {
                return true;
              } else {
                console.log("Please enter your title name!");
                return false;
              }
            },
          },
          {
            type: "list",
            name: "department",
            message: "Which department are you from?",
            choices: departmentChoices,
          },
          {
            type: "input",
            name: "salary",
            message: "Enter your salary",
            validate: (salary) => {
              if (salary) {
                return true;
              } else {
                console.log("Please enter your salary");
                return false;
              }
            },
          },
        ])

        // .then((name) => {
        //   connection.promise().query("INSERT INTO department SET?", name);
        //   selectDepartments();
        // });

        .then(({ title, department, salary }) => {
          connection.promise().query(
            "INSERT INTO role SET?",
            {
              title: title,
              department_id: department,
              salary: salary,
            },
            function (err, res) {
              if (err) return console.log(err);
            }
          );
        })
        .then(() => selectRoles());
    })
    .catch((err) => {
      console.log(err);
    });
}

function addEmployee() {
  // return connection.promise().query(
  //   "SELECT Rol.id, Rol.title FROM role R;"
  // )
  //   .then(([employees]) => {
  //     let titleChoices = employees.map(({
  //       id,title
  //     }) => ({
  //       value: id,
  //       name: title
  //     }))
  //   })

  db.promise()
    .query(
      "SELECT Emp.id, CONCAT(Emp.First_name, ' ', Emp.last_name) AS manager FROM employee Emp;"
    )
    .then(([managers]) => {
      let managerChoices = managers.map(({ id, manager }) => ({
        value: id,
        name: manager,
      }));
    });

  inquirer
    .prompt([
      {
        type: "list",
        name: "firstName",
        message: "What is the employees first name?",
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
    ])
    .then(({ firstName, lastName, role, manager }) => {
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: firstName,
          last_name: lastName,
          role_id: role,
          manager_id: manager,
        },
        function (err, res) {
          if (err) return console.log(err);
        }
      );
    })
    .then(() => selectEmployees());
}

// function questionEmp() {
//   inquirer.prompt([
//     {
//       type: "list",
//       name: "firstName",
//       message: "What is the employees first name",
//       validate: (firstName) => {
//         if (firstName) {
//           return true;
//         } else {
//           console.log("Please enter the employees first name!");
//           return false;
//         }
//       },
//     },
//     {
//       type: "list",
//       name: "lastName",
//       message: "What is the employees last name",
//       validate: (firstName) => {
//         if (firstName) {
//           return true;
//         } else {
//           console.log("Please enter the employees last name!");
//           return false;
//         }
//       },
//     },
//     {
//       type: "list",
//       name: "role",
//       message: "What is the employees role?",
//       choices: titleChoices,
//     },
//     {
//       type: "list",
//       name: "manager",
//       message: "Who is the employees manager?",
//       choices: managerChoices,
//     },
//   ]);
// }

function addUpdateRole() {
  // return connecton.promise().query(
  //   "SELECT Rol.id, Rol.title, Rol.Salary, Rol.department_id FROM role Rol;"
  // )
  //  .then(([roles])) => {
  //   let roleChoices = roles.map(({
  //     id, title
  //   }) => ({
  //     value: id,
  //     name: title
  //   }));
  //  }

  inquirer
    .prompt({
      type: "list",
      name: "role",
      message: "Which role do you want to update?",
      choices: roleChoices,
    })
    .then((role) => {
      console.log(role);

      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Enter the name of your title",
            validate: (titleName) => {
              if (titleName) {
                return true;
              } else {
                console.log("Please enter your title name");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "salary",
            message: "Enter your salary",
            validate: (salary) => {
              if (salary) {
                return true;
              } else {
                console.log("Please enter your salary!");
                return false;
              }
            },
          },
        ])
        .then(({ title, salary }) => {
          const query = connection.query(
            "UPDATE role SET title = ?, salary = ? WHERE id = ?",
            [title, salary, role.role],
            function (err, res) {
              if (err) console.log(err);
            }
          );
        })
        .then(() => {
          //promptMenu();
          init();
        });
    });
}

// promptMenu();
