// In require function if package name is give as it is then it will check in it's node directory 
// if we use ./ then will check in curr directory  
const math = require("fs");
const {add , sub} = require("./math");

console.log(math);
console.log(add(2 , 3));
console.log("hello JS");