const { prompt } = require("inquirer");
const { promisify } = require("util");
const { writeFile, appendFile } = require("fs").promises;

prompt([
  {
    type: "input",
    name: "memberCount",
    message: "How many members on the team?",
  },
]).then(async (data) => {
  let members = [];

  for (i = 0; i < data.memberCount; i++) {
    members.push(
      await prompt([
        {
          type: "input",
          name: "memberName",
          message: "Name of your team member?",
        },
        {
          type: "list",
          name: "memberRole",
          message: "What is the role of this member?",
          choices: ["Manager", "Engineer", "Intern"],
        },
        {
          type: "input",
          name: "memberEmail",
          message: "What is the email for this member?",
        },
        {
          type: "input",
          name: "memberId",
          message: "What is the ID of this member?",
        },
        {
          type: "input",
          name: "roleSpecificProperty",
          message: "What school did you attend?",
          // memberRole = data
          when: ({ memberRole }) => {
            return memberRole === "Intern";
          },
        },
        {
          type: "input",
          name: "roleSpecificProperty",
          message: "Link to Github profile?",
          // memberRole = data
          when: ({ memberRole }) => {
            return memberRole === "Engineer";
          },
        },
        {
          type: "input",
          name: "roleSpecificProperty",
          message: "What is your office number?",
          // memberRole = data
          when: ({ memberRole }) => {
            return memberRole === "Manager";
          },
        },
      ])
    );
  }

  let membersHtml = members.reduce((total, member) => {

    let label = ''

    if (member.memberRole === 'Intern') {
      label = 'School'
    }
    else if (member.memberRole === 'Manager') {
      label = 'Office Number'
    }
    else if (member.memberRole === 'Engineer') {
      label = 'Github Link'
    }


    return (
      total +
      `
        <div class="row" style=>
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title"> Name: ${member.memberName}, Title: ${
        member.memberRole
      }</span>
            <p>
            ID: ${member.memberId}
            </p>
            <p>
            Email: ${member.memberEmail}
            </p>
            <p>
            ${label}: ${member.roleSpecificProperty}
            </p>
            
          </div>
        </div>
      </div>
    </div>
  `
    );
  }, "");

  writeFile(
    "./output/team.html",
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Team</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
</head>
<body>
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Team</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li><a href="collapsible.html">JavaScript</a></li>
        </ul>
      </div>
    </nav>
  ${membersHtml}
</body>
</html>
`
  ).catch((err) => console.log(err));
});
