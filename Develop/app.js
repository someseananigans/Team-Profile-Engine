const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = []

const manager = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is your id?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?'
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is your officeNumber?'
    },
  ])
  .then(manager => {
    team.push(new Manager(manager.name, manager.id, manager.email, manager.officeNumber))
    role()
  })
  .catch(err => console.log(err))
}

const engineer = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is your id?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?'
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is your github?'
    },
  ])
  .then(engineer => {
    team.push(new Engineer(engineer.name, engineer.id, engineer.email, engineer.github))
    role()
  })
  .catch(err => console.log(err))
}

const intern = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is your id?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?'
    },
    {
      type: 'input',
      name: 'school',
      message: 'What is your school?'
    },
  ])
  .then(intern => {
    team.push(new Intern(intern.name, intern.id, intern.email, intern.school))
    role()
  })
  .catch(err => console.log(err))
}

const role = () => {
  prompt([
    {
      type: 'list',
      name: 'teamRole', 
      choices: ["Manager","Engineer","Intern","Done adding team members"],
      message: 'Select a role to add to team'
    }
  ])
  .then(({teamRole}) => {
    switch (teamRole) {
      case "Manager":
        manager()
        break;
      case "Engineer":
        engineer()
        break;
      case "Intern":
        intern()
        break;
      case "Done adding team members":
        createHTML()
        break;
    }
  })
  .catch(err => console.log(err))
}

const createHTML = () => {
  console.log('this is the html')
  console.log(render(team))
  render(team)
  fs.writeFile('index.html', render(team), err => {
  if (err) { console.log(err) }})
}

role()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
