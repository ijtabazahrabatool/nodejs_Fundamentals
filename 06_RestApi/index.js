const express = require("express");
const fs = require("fs");
const users = require("../06_RestApi/MOCK_DATA.json");
const { json } = require("stream/consumers");

const app = express()
const PORT = 8000

//middleware - plugin
app.use(express.urlencoded({extended: false}));

//Routes
// for json rendering - server side
app.get('/api/users', (req , res) =>{
    return res.json(users);
})


// for html rendering - server side
app.get('/users' , (req , res) =>{
    /*
    <ul>
        <li> Ijtaba <li>
    <ul>
    */ 
    const html = `
    <ul>
    ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
    <ul>
    `;
    res.send(html);
});


app.
route("/api/users/:id")
.get((req , res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return res.json(user);
})
.patch((req ,res) =>{
    const userId = parseInt(req.params.id); // id data comes in form of string which needed to be parsed 
    const updates = req.body; // what we send stores in this 
    //console.log(updates);

    const userIndex = users.findIndex(u => u.id === userId);

    if(userIndex === -1) {
        res.json({status:'failed' , message : 'Invalid ID'});
    };

    users[userIndex] = {...users[userIndex] , ...updates };
    console.log(users[userIndex]);

    fs.writeFile('./MOCK_DATA.json' , JSON.stringify(users,null, 2),(err)=>{
        if(err) console.log("Error at write file" , err);
        res.json({status:'success',users: users[userIndex]});
    });
})
.delete((req , res)=>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if(userIndex === -1) res.json({status:'failed', message: 'Id not found'});

    //Remove the user
    const deletedUser = users.splice(userIndex , 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedUsers, null , 2), (err)=>{
        if(err) res.json({status: 'Error', message: err});
        res.json({status: 'success' , deleted: deletedUser[0]});
    });
})


app.post('/api/users' , (req , res) =>{
    const body = req.body;
    users.push({...body , id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err , data) =>{

    })
    console.log("Body" , body);
    return res.json ({status : "success" , id: users.length}); 
})
app.listen(PORT , () => console.log(`Server Started at PORT ${PORT}`)); 