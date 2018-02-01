const moment = require('moment');


// const date = moment();
// console.log(date.format('MMM Do, YYYY'));

const createdAt = 1234;
const date = moment(createdAt);
console.log(date.format('h:mm a'));