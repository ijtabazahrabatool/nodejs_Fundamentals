const express = require("express");


const app = express();

app.get('/' , (req , res) => {
    return res.send("Hello from home Page");
});

app.get('/about' , (req , res) =>{
   // return res.send("Hello from about page" + " hey " + req.query.name + " You are " + req.query.age);
   return res.send(`Hello ${req.query.name}`);
});

app.listen(8000 , () => console.log("Server Started!"));

