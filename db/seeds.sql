INSERT INTO departments(name)
VALUES ("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO roles(title, salary, department_id)
VALUES ("Engineer", 80000, 1),
("Analyst", 80000, 2);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Pablo", "Villalon", 1, null),
("Maria", "Villalon", 2, null);