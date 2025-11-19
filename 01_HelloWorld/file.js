const fs = require("fs");

// // sync(return result)
// fs.writeFileSync("./text.txt", "Hello Ijtaba's here!");

// async (doesn't return anything, always expect a call back)
// fs.writeFile("./text.txt", "hello this is Async", (err)=>{});

// // it returns the result , error handled by try-catch
// const result = fs.readFileSync("./contact.txt","utf-8");
// console.log(result);


// // In case of Async it doesn't return anything 
// fs.readFile("./contact.txt" , "utf-8", (err , result)=>{
//     if(err) console.log("Error", err);
//     else console.log (result);
// });


// fs.appendFileSync("./text.txt" , new Date().getDate().toLocaleString());
// fs.appendFileSync("./text.txt" , `Hey there\n`);
// fs.appendFileSync("./text.txt" , `${Date.now()} Hey there\n`);

// // for copying txt
// fs.cpSync("./text.txt" , "./copy.txt");

// // for Deleting file 
// fs.unlinkSync("./copy.txt");


// // for seeing statistics of file
// console.log(fs.statSync("./text.txt"));
//console.log(fs.statSync("./text.txt").isFile());

// can make directory
// fs.mkdirSync("my-docs");
fs.mkdirSync("my-docss/a/b" , {recursive: true});
