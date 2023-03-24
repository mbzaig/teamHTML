
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
                // choice of 3
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
            message: "What is their employee ID?",
            name: "managerID",
        },
        {
            type: "input",
            message: "What is their email address?",
            name: "managerEmail",
        },
        {
            type: "input",
            message: "What is their office number?",
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
        // prompt for next action
        promptForEmployeeType();
    });

}

