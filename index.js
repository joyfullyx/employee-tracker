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
        choices: ['View all departments', 'View all employees', 'View all roles', 'Add department', 'Add an employee', 'Add an employee by role', 'Update employee role', 'Quit'],
        name: 'action'
    }
]

const addDeptQ = [
    {
        type: 'list',
        message: "What is the name of the department?",
        choices: ['Sales', 'Engineering', 'Finance', 'Legal', 'Add new department'],
        name: 'department'
    }
]

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
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant', 'Lawyer', 'Legal Team Lead'],
        name: 'title'
    },
    {
        type: 'list',
        message: "What is the employee's department?",
        choices: ['Sales', 'Engineering', 'Finanace', 'Legal'],
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

const addByRoleQ = [
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
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant', 'Lawyer', 'Legal Team Lead'],
        name: 'title'
    }
]

const updateRoleQ = [
    {
        type: 'list',
        message: "Which employee's role would you like to update?",
        choices: [],
        name: 'name'
    },
    {
        type: 'list',
        message: "What should the role be updated to?",
        choices: [],
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
            case 'View all departments':
                showDpt();
                break;
            
            case 'View all employees':
                showEmployees();
                console.log('Show me the employees')
                break;
            
            case 'View all roles':
                showRoles();
                break;

            case 'Add department':
                addDept();
                break;

            case 'Add an employee':
                addEmployee();
                break;

            case 'Add an employee by role':
                break;

            case 'Update employee role':
                console.log('Make some role changes')
                break;

            case 'Quit':
                console.log('No more')
                break;

            default:
                break;
        }
    })
}
start();

// function to show all departments
const showDpt = () => {
    console.log('Showing all departments...\n');
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        // TODO: add function here
    })
    start();
};

// function to show all employees
const showEmployees = () => {
    console.log('Showing all employees...\n');
    connection.query('SELECT * FROM employee', 
    (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    start();
};

// function to show all roles
const showRoles = () => {
    console.log('Showing employees by role...\n');
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    start();
}

const addDept = () => {
    inquirer.prompt(addDeptQ)
        .then((answer) => {
            connection.query('INSERT INTO department SET name = ?', answer.department,
            (err, res) => {
                if (err) throw err;
                console.table(res)
                start();
            });
        });
};

const addEmployee = () => {
    inquirer.prompt(addEmployeeQ)
    .then((answer) => {
        connection.query('INSERT INTO employee SET ?',
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            title: answer.title,
            department: answer.department,
            salary: answer.salary
        }, 
        (err, res) => {
            if (err) throw err;
            console.table(res)
            start();
        })
    })
}
 



// function addEmployee() {
//     console.log('Adding new employee...\n');
//     inquirer.prompt(addEmployeeQ)
//     .then(answers => {
//         const employee = answers.firstName + ' ' + answers.lastName;
//         employeeArr.push(employee);
//         // console.log(employeeArr);
//         console.log(`${employee} added`)
//     })
// }

// const addEmployee = () => {
//     inquirer.prompt(addEmployeeQ)
//     .then (({ employee, department, role }) => {
//         connection.query('INSERT INTO employee SET ?', {
//             first_name,
//             last_name,
//             role_id, 
//             manager_id,
//         }, (err) => {
//             if (err) console.log(err)
//             console.log('Employee added!')
//             showAll();
//         })
//     })
// }
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`)
});