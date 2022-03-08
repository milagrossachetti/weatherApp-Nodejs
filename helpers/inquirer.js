const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.brightMagenta} Search city`
            }, 
            {
                value: 2,
                name: `${'2.'.brightMagenta} Search history`
            },
            {
                value: 0,
                name: `${'0.'.brightMagenta} Exit\n`
            },
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('----------------------------'.brightWhite.bgMagenta);
    console.log('     Select an option:      '.brightWhite.bgMagenta);
    console.log('----------------------------\n'.brightWhite.bgMagenta);
    
    const {option} = await inquirer.prompt(questions);
    return option;
}

const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.brightMagenta} to continue`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const readInput = async(message) => {
    const question =[
        {
            type: 'input',
            name: 'place',
            message,
            validate(value){
                if(value.length === 0 ){
                    return 'Please enter a value';
                }
                else return true;
            }
        }
    ];

    const {place} = await inquirer.prompt(question);
    return place;
}

const listPlaces = async(places = []) => {
    const choices = places.map((place, i) =>{
        const idx = `${i+1}.`.brightMagenta;
        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.brightMagenta + ' Cancelar'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select a place',
            choices
        }
    ]

    const {id} = await inquirer.prompt(questions);
    return id;
}

// const confirm = async(message) => {
//     const question = [
//         {
//             type: 'confirm',
//             name: 'ok',
//             message
//         }
//     ];

//     const {ok} = await inquirer.prompt(question);
//     return ok;
// }

// const showListCheck = async(tasks = []) => {
//     const choices = tasks.map((task, i) =>{
//         const idx = `${i+1}.`.green;
//         return {
//             value: task.id,
//             name: `${idx} ${task.description}`,
//             checked: (task.completedIn) ? true : false
//         }
//     });

//     const question = [
//         {
//             type: 'checkbox',
//             name: 'ids',
//             message: 'Select',
//             choices
//         }
//     ]

//     const {ids} = await inquirer.prompt(question);
//     return ids;
// }

module.exports = {
    inquirerMenu, 
    pause,
    readInput,
    listPlaces,
    // confirm,
    // showListCheck
}