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
    manager_id INTEGER(100) NOT NULL,
    PRIMARY KEY (id)
);