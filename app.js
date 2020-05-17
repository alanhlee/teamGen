const { prompt } = require('inquirer')
const { promisify } = require('util')
const { writeFile, appendFile } = require('fs').promises

writeFile('aboutUs.html',
  `
hi did this with promises
`
)
  .catch(err => console.log(err))