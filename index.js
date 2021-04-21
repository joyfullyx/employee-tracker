const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all employees', 'View employees by role', 'Add department', 'Add an employee', 'Add an employee by role', 'Update employee role', 'Quit'],
        name: 'action'
    }
]

function takeAction() {
    inquirer.prompt(questions)
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