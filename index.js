const inquirer = require('inquirer');
const mysql = require('mysql');
// const { Console } = require('node:console');
// const { connect } = require('node:http2');

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
        choices: ['View all employees','View all employees by department', 'View employees by role','Add an employee', 'Add a role', 'Add a department', 'Update employee role', 'Quit'],
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
const deptArr = ['Sales', 'Engineering', 'Finanace', 'Legal'];
// const managerId = [];
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
    //     type: 'input',
    //     message: 'What is the manager id?',
    //     name: 'managerId'
    // },
    {
        type: 'list',
        message: "What is the employee's department?",
        choices: deptArr,
        name: 'department'
    },
    {
        type: 'input',
        message: "What is the employee's salary?",
        name: 'salary',
        validate: function(value){
            if(Number(value)) {
                return true
            } else {
                return false
            }
        } 
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        choices: ['Kat Larsen', 'Brian Anderson', 'Jessica Parker', 'Jonathan Long', 'Patrick Harris', 'Meredith Grey'],
        name: 'manager'
    }
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

// const showAll = () => {
//     console.log('Showing all employees...\n');
//     connection.query('SELECT * FROM employee_db', (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         // TODO: add function here...?
//     })
// };

const start = () => {
    inquirer.prompt(starterQuestion)
    .then(answers => {
        // console.log(answers)
        switch (answers.action) {
            case 'View all employees':
                showEmployees();
                // console.log('Show me the employees')
                break;

            case 'View all employees by department':
                showByDpt();
                break;
            
            // case 'View all employees by Manager':
            //     showByManager();
            //     break;

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
                // console.log('Make some role changes')
                break;

            case 'Quit':
                console.log('Thank you for using the employee database')
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
    SELECT employee.id, role.title, employee.first_name, employee.last_name, department.name AS department_name, role.salary 
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
    FROM role 
    JOIN employee 
    ON employee.id = role.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

// function to show all employees by manager
// TODO: manager???
// const showByManager = () => {
//     console.log('Showing employees by role...\n');
//     connection.query('SELECT * FROM role', (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         // reprompt start questions
//         start();
//     })
// };

// const addEmployee = () => {
//     inquirer.prompt(addEmployeeQ)
//     .then ((answer) => {
//         answer.department_id = employeeRoleArr.indexOf(answer.title) +1;
//         answer.role_id = deptArr.indexOf(answer.department) +1;
//         connection.query('INSERT INTO employee SET ?',
//         [{
//             first_name: answer.first_name,
//             last_name: answer.last_name,
//             role_id: answer.department_id,
//             // department_id = answer.role_id,
//             salary: answer.salary,
//             manager: answer.manager
//         }], 
//         (err, res) => {
//             if (err) throw err;
//             console.table(res);
//         })
//     })
// }

// function to add an employee
// TODO: insert 

// const addEmployee = () => {
//     inquirer.prompt(addEmployeeQ)
//     .then((answer) => { 
//         answer.department_id = employeeRoleArr.indexOf(answer.title) +1;
//         connection.query('INSERT INTO employee SET ?',
//         {
//             first_name: answer.firstName,
//             last_name: answer.lastName,
//             role_id: answer.department_id,
//             title: function () {
//                 employeeRoleArr;
//                 answer.forEach(answer => {
//                     employeeRoleArr.push(answer.title)
//                 }) 
//             // manager_id = answer.managerId,
//             // name of dept
//             // salary
//         }, 
//         (err, res) => {
//             if (err) throw err;
//             console.table(res)
//             // reprompt start questions
//             start();
//         })
//     })
// };

const addRole = () => {
    console.log('Adding role...\n');
    inquirer.prompt(addRoleQ)
    .then((answer) => {
        connection.query(`
        INSERT INTO role SET title = ?, salary = ?, department_id = ?`, [answer.title, answer.salary, answer.deptId], 
        (err, res) => {
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
            if (err) throw err;
            showDept();
            // reprompt start questions
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
    FROM role 
    JOIN employee ON employee.id = role.id`,
    (err, res) =>{ 
    if (err) throw err;
    console.table(res);
    })
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`)
});