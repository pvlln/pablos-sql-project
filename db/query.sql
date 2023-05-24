Select eTable.id, CONCAT(eTable.first_name, ' ', eTable.last_name) as Name, roles.title as Role, roles.salary as Salary, dTable.name as "Department Name", CONCAT(mTable.first_name, ' ', mTable.last_name) as Manager
from employees as eTable
JOIN roles ON
    eTable.role_id = roles.id
JOIN departments as dTable ON
    roles.department_id = dTable.id
LEFT JOIN employees as mTable ON
    eTable.manager_id = mTable.id;

SELECT department.department_id as Department
FROM roles
JOIN 