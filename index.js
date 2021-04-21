const inquirer = require('inquirer');

const employeeArr = [];
const managerArr = [];
const roleArr = [];
const deptArr = [];

const starterQuestion = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all employees', 'View employees by role', 'Add department', 'Add an employee', 'Add an employee by role', 'Update employee role', 'Quit'],
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
        choices: [],
        name: 'title'
    },
    {
        type: 'list',
        message: "What is the employee's department?",
        choices: [],
        name: 'department'
    },
    {
        type: 'input',
        message: "What is the employee's salary?",
        name: 'salary'
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        choices: [],
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
        choices: [],
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

function takeAction() {
    inquirer.prompt(starterQuestion)
    .then(answers => {
        // console.log(answers)
        switch (answers.action) {
            case 'View all departments':
                console.log('Show me the departments')
                break;
            
            case 'View all employees':
                console.log('Show me the employees')
                break;
            
            case 'View employees by role':
                console.log('Show me the roles')
                break;

            case 'Add department':
                console.log('Add me a department')
                break;

            case 'Add an employee':
                console.log('Let me add someone')
                addEmployee();
                break;

            case 'Add an employee by role':
                console.log('Let me add by role')
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
takeAction();

function addEmployee() {
    inquirer.prompt(addEmployeeQ)
    .then(answers => {
        const employee = answers.firstName + ' ' + answers.lastName;
        employeeArr.push(employee);
        // console.log(employeeArr);
        console.log(`${employee} added`)
    })
}