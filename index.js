const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

const starterQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all employees','View all employees by department', 'View employees by role','Add an employee', 'Add a role', 'Add a department', 'Update employee role', 'Delete a department', 'Quit'],
        name: 'action'
    }
]

const addDeptQ = [
    {
        type: 'input',
        message: "What is the name of the department?",
        name: 'department'
    }
]

const employeeRoleArr = ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant', 'Lawyer', 'Legal Team Lead'];
const deptArr = ['Sales', 'Engineering', 'Finanace', 'Legal', 'Strategy', 'Hospitality', 'Media', 'Music', 'Social Media'];
const managerArr = ['Kat Larsen', 'Brian Anderson', 'Jessica Parker', 'Jonathan Long', 'Patrick Harris', 'Meredith Grey'];

const addEmployeeQ = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName'
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lastName'
    },
    {
        type: 'list',
        message: "What is the employee's role?",
        choices: employeeRoleArr,
        name: 'title'
    },
    // {
    //     type: 'list',
    //     message: "What is the employee's department?",
    //     choices: deptArr,
    //     name: 'department'
    // },
    // {
    //     type: 'list',
    //     message: "Who is the employee's manager?",
    //     choices: managerArr,
    //     name: 'manager'
    // },
    // {
    //     type: 'input',
    //     message: "What is the employee's salary?",
    //     name: 'salary',
    //     validate: function(value){
    //         if(Number(value)) {
    //             return true
    //         } else {
    //             return false
    //         }
    //     } 
    // },
]

const addRoleQ = [
    {
        type: 'input',
        message: 'What is the name of the role to add?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'What is the salaray for this role?',
        name: 'salary'
    },
    {
        type: 'input',
        message: 'What is the department ID of this role?',
        name: 'deptId',
        validate: function(value) {
            if(Number(value)) {
                return true
            } else {
                return false
            }
        }
    }
]

const updateRoleQ = [
    {
        type: 'input',
        message: "What is the first name of the employee?",
        name: 'firstName'
    },
    {
        type: 'input',
        message: "What is the last name of the employee?",
        name: 'lastName'
    },
    {
        type: 'input',
        message: "What should the role be updated to?",
        name: 'title'
    }
]

const deleteDptQ = [
    {
        type: 'list',
        message: 'Which department would you like to remove?',
        choices: deptArr,
        name: 'deleteDpt'
    }
];

const start = () => {
    inquirer.prompt(starterQuestion)
    .then(answers => {
        // console.log(answers)
        switch (answers.action) {
            case 'View all employees':
                showEmployees();
                break;

            case 'View all employees by department':
                showByDpt();
                break;

            case 'View employees by role':
                showByRole();
                break;

            case 'Add an employee':
                addEmployee();
                break;

            case 'Add a role':
                addRole();
                break;

            case 'Add a department':
                addDept();
                break;


            case 'Update employee role':
                updateRole();
                break;

            case 'Delete a department':
                deleteDpt();
                break;

            case 'Quit':
                console.log('Thank you for using the employee database')
                connection.end();
                break;

            default:
                break;
        }
    })
}
start();

// function to show all employees and all info
const showEmployees = () => {
    console.log('Showing all employees...\n');
    // connection.query('SELECT * FROM employee', 
    connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary 
    FROM employee 
    JOIN role 
    ON role.id = employee.role_id 
    JOIN department 
    ON role.department_id = department.id`,
    (err, res) => {
        if (err) throw err;
        console.table(res);
        // reprompt start questions
        start();
    })
};

// function to show all employees by department
const showByDpt = () => {
    console.log('Showing all employees by department...\n');
    connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, department.name AS department_name 
    FROM department 
    JOIN employee 
    ON employee.id = department.id`, 
    (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

const showByRole = () => {
    console.log('Showing all employees by role...\n');
    connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    JOIN role
    ON employee.role_id = role.id`, 
    (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

// function to add employee
const addEmployee = () => {
    inquirer.prompt(addEmployeeQ)
    .then ((answer) => {
        // answer.department_id = employeeRoleArr.indexOf(answer.title) +1;
        // answer.role_id = deptArr.indexOf(answer.department) +1;
        answer.title = employeeRoleArr.indexOf(answer.title) +1;
        answer.manager = managerArr.indexOf(answer.manager) +1;
        connection.query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES (?, ?, ?, ?)`,
        [answer.firstName, answer.lastName, answer.title, answer.manager], 
        (err, res) => {
            employeeRoleArr.push(answer.title);
            console.log(employeeRoleArr);
            if (err) throw err;
            showAddedEmployee();
            connection.end();
        })
    })
};

const showAddedEmployee = () => {
    console.log('Employee Added!\n');
    connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.department_id
    FROM employee
    JOIN role 
    ON role.id = employee.role_id
    JOIN department ON role.department_id = department.id
    `,
    (err, res) => {
        if (err) throw err;
        console.table(res);
    })
};

const addRole = () => {
    console.log('Adding role...\n');
    inquirer.prompt(addRoleQ)
    .then((answer) => {
        connection.query(`
        INSERT INTO role SET title = ?, salary = ?, department_id = ?`, [answer.title, answer.salary, answer.deptId], 
        (err, res) => {
            employeeRoleArr.push(answer.title);
            console.log(employeeRoleArr);
            if (err) throw err;
            showRole();
            connection.end();
        })
    })
}

showRole = () => {
    connection.query(`
    SELECT * FROM role`, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
};

// function to add new department
const addDept = () => {
    console.log('Adding department...\n')
    inquirer.prompt(addDeptQ)
    .then((answer) => {
        connection.query('INSERT INTO department SET name = ?', (answer.department),
        (err, res) => {
            deptArr.push(answer.department);
            console.log(deptArr);
            if (err) throw err;
            showDept();
            connection.end();
        });
    });
    // start();
};

// function for showing added department 
const showDept = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
    })
};

// function to update an employee role
const updateRole = () => {
    inquirer.prompt(updateRoleQ)
    .then((answer) => {
        connection.query(`
        UPDATE role, employee 
        SET title = ? 
        WHERE employee.first_name = ? 
        AND employee.last_name = ? 
        AND role.id = employee.id`, [answer.title, answer.firstName, answer.lastName], 
        (err, res) => {
            employeeRoleArr.push(answer.title);
            console.log(employeeRoleArr);
            if (err) throw err;
            showRoleUpdate();
            // reprompt start questions
            connection.end()
        })
    });
    // start();
};

// function for showing role update
const showRoleUpdate = () => {
    connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    JOIN role
    ON role.id = employee.role_id`,
    (err, res) =>{ 
    if (err) throw err;
    console.table(res);
    })
};

const deleteDpt = () => {
    inquirer.prompt(deleteDptQ)
    .then((answer) => {
        connection.query(`
        DELETE FROM department 
        WHERE department.name = ?,
        `, answer.deleteDpt, 
        (err, res) => {
            if (err) throw err;
            console.table(res);
            showDeleteDpt();
            connection.end();
        })
    })
}

const showDeleteDpt = () => {
    connection.query(`
    SELECT * FROM department;
    `, (err) => {
        if (err) throw err;
    })
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`)
});