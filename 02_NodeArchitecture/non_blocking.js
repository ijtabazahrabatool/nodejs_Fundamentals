const fs = require("fs");

// async call 
console.log(2);

fs.readFile("../01_HelloWorld/contact.txt" , "utf-8", (err , result) =>{
    if(err) console.log("Error" , err);
    else console.log(result);
})

console.log(4);