
//declare all variables

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employee = require("./lib/Employee");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const employees = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.


const promptForEmployeeType = () => {
    inquirer
        .prompt([
            {
                // choice of 4
                type: "list",
                message: "What do you need to do next?",
                name: "employeeType",
                choices: [
                    "Add a Manager",
                    "Add an Engineer",
                    "Add an Intern",
                    "The team is complete",
                ],
            },
        ])
        .then((response) => {
            if (response.employeeType === "Add a Manager") {
                promptForManager();
            }
            else if (response.employeeType === "Add an Engineer") {
                promptForEngineer();
            } else if (response.employeeType === "Add an Intern") {
                promptForIntern();
            } else {
                fillPage();
            }
            //    use the functionality from page-template to generate the team
        });
};
const promptForManager=()=>{
inquirer
    .prompt([
        {
            //manager questions
            type: "input",
            message: "What is the team Manager's name?",
            name: "managerName",
        },
        {
            type: "input",
            message: "Enter employee ID?",
            name: "managerID",
        },
        {
            type: "input",
            message: "Enter email address?",
            name: "managerEmail",
        },
        {
            type: "input",
            message: "Enter office number?",
            name: "managerOffice",
        },
    ])
    .then((response) => {
        // populate manager info
        const { managerName, managerID, managerEmail, managerOffice } = response;
        const manager = new Manager(
            managerName,
            managerID,
            managerEmail,
            managerOffice
        );
        // push to array
        employees.push(manager);
        // prompt next action
        promptForEmployeeType();
    });

}
//Prompt for Engineer

const promptForEngineer = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the Engineer's name?",
                name: "engineerName",
            },
            {
                type: "input",
                message: "Enter  employee ID?",
                name: "engineerID",
            },
            {
                type: "input",
                message: "Enter  email address?",
                name: "engineerEmail",
            },
            {
                type: "input",
                message: "Enter  GitHub username?",
                name: "engineerGit",
            },
            //engineer questions
        ])
        .then((response) => {
            // declare variables
            const { engineerName, engineerID, engineerEmail, engineerGit } = response;
            const engineer = new Engineer(
                engineerName,
                engineerID,
                engineerEmail,
                engineerGit
            );

            // push inputs to the array
            employees.push(engineer);

            // prompt for next action
            promptForEmployeeType();
        });
};

const promptForIntern = () => {
    inquirer
        .prompt([
            {
                //intern questions
                type: "input",
                message: "What is the Intern's name?",
                name: "internName", // not sure the different nameing structure is necessary
            },
            {
                type: "input",
                message: "Enter  employee ID?",
                name: "internID",
            },
            {
                type: "input",
                message: "Enter  email address?",
                name: "internEmail",
            },
            {
                type: "input",
                message: "Enter the name of their school?",
                name: "internSchool",
            },
        ])
        .then((response) => {
            // add new intern to employees array
            // declare variables
            const { internName, internID, internEmail, internSchool } = response;
            const intern = new Intern(
                internName,
                internID,
                internEmail,
                internSchool
            );
            // push inputs to array
            employees.push(intern);
            // prompt for next action
            promptForEmployeeType();
        });
};

// write the HTML
const fillPage = () => {
    const html = render(employees);

    fs.writeFile(outputPath, html, (err) => {
        err ? console.error(err) : console.log("Your HTML has been generated");
    });
};