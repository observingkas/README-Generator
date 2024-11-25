// TODO: Include packages needed for this application
import inquirer from 'inquirer'; // Import inquirer from CL prompts
import fs from 'fs'; //Import fs from CL prompts to write files
import { cpuUsage } from 'process';
import { transferableAbortSignal } from 'util';

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'description',
        message: 'What is the Description of your project?',
    },

    {
        type: 'editor',
        name: 'tableOfContents',
        message: 'Provide your Table of Contents (one per line). The editor will open for you to enter detailed content:',
    },

    {
        type: 'editor',
        name: 'installation',
        message: 'What are the Installation instructions?',
    },

    {
        type: 'editor',
        name: 'usage',
        message: 'What is the usage information for your project?',
    },

    {
        type: 'list',
        name: 'license',
        message: 'What is the license for your project?',
        choices: ['MIT', 'GPL', 'Apache', 'ISC', 'Other'],
    },

    {
        type: 'editor',
        name: 'contributing',
        message: 'What are the contributing guidelines?',
    },

    {
        type: 'input',
        name: 'tests',
        message: 'What are the test instructions?',
    },

    {
        type: 'input',
        name: 'questions',
        message: 'What is your contact information for questions?',
    },
];


// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully created README file!');
        }
    });
}


// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            //Format the data into a README structure
            const readmeContent = `
        # ${answers.description}
        
        ## Table of Contents 
        - Installation
        - Usage
        - License
        - Contributing
        - Tests
        - Questions

        ## Installation
        ${answers.installation}

        ## Usage
        ${answers.usage}

        ## License
        This project is licensed under the ${answers.license} License.

        ## Contributing
        ${answers.contributing}

        ## Tests
        ${answers.tests}

        ## Questions
        For questions, contact: ${answers.questions}
        `;

            //Call the function to write the README file
            writeToFile('README.md', readmeContent);
        })
        .catch((error) => {
            console.error('Error collecting answers:', error);
        });
}

// Function call to initialize app
init();
