## Table of Contents:

## Description:

This application is build to manage employee database of the company, and I have used softwares like Node.js, Inquirer, and My SQL to run the program.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Installation:

Here are the installation guide:
Clone the code into your terminal for the respective repository.
You can then install npm by entering the command "npm init" into the terminal.
Next step will be to enter 'npm install inquirer' inorder to install the inquirer.
then, program can be run by entering node app.js into the command line.

You also have to launch MySQL command-line to run the program. For this you can follow these steps:
mysql -uroot -p, in which -p is needed only if you have a password otherwise you can just hit enter.

## Usage:

1. Clone the package in your terminal
2. Install npm: npm init -y
3. Install inquirer: npm i inquirer
4. Install mysql
5. In the command-line, run "node app.js"
6. Answer all of the question in the command-line

## Technology Used:

Node.js
Inquirer
MySQL
JavaScript

## Questions:

If you want to check my work you can visit me at Githbu rdsherpa, https://github.com/rdsherpa/Track-My-Employee.
You can also email me at sherpariwa@gmail.com.
I have also attatched a link to a video where I have went over the process of this application:
