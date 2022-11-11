SELECT employee.id, employee.first_name, employee.last_name, role.salary
FROM employee
Join role ON role.id = employee.id