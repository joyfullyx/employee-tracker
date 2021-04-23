-- dropts employee_db if it currently exists --
DROP DATABASE IF EXISTS employee_db;

-- create employee_db database 
CREATE DATABASE employee_db;

-- use employee_db database
USE employee_db;

CREATE TABLE department(
    id INTEGER NOT NULL AUTO_INCREMENT
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

-- create employee table within employee_db
CREATE TABLE employee (
    -- create id column that auto increments default value as new rows are created
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(100) NOT NULL,
    manager_id INTEGER(100),
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ('Sales');
INSERT INTO department (name)
VALUES ('Engineering');
INSERT INTO department (name)
VALUES ('Finanace');
INSERT INTO department (name)
VALUES ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Lawyer', 190000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Legal Team Lead', 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Davis', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tiffany', 'Haddish', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Lucy', 'Liu', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kanye', 'West', 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Preeti', 'Gupta', 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Travolta', 6, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Dwayne', 'Johnson', 7, 4);