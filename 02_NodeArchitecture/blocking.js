const fs = require("fs");
const os = require("os"); // your pc os info returned


// // sync call
// console.log(1);
// const result = fs.readFileSync("../01_HelloWorld/contact.txt", "utf-8");
// console.log(result);
// console.log(2);

console.log(os.cpus().length);
