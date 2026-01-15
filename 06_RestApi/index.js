const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const { json } = require("stream/consumers");

const app = express()
const PORT = 8081

//middleware - plugin
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req , res , next)=>{
   
    fs.appendFile(
        'log.txt' ,
        `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`,
        (err, data)=>{
            next();
        }
    )
});

//NOTE: practice writing middleware ,  using middleware  , use third party middle ware

// app.use((req , res , next)=>{
//     console.log("hello from middleware 1");
//     req.myUserName = 'Ijtaba Zahra '; 
//   //res.json({msg: "Hello from middleware1"});
//     next();
// })

// app.use((req , res , next)=>{
//     console.log("hello from middleware 2" , req.myUserName);
//     //db query
//     //credit card info
//     //res.end('ended');
//     next(); 
// })

//Routes
// for json rendering - server side
app.get('/api/users', (req , res) =>{
    console.log(req.headers);
    res.setHeader("X-myName", "xebra"); //  custom header
    //Good Practices ----> Always add 'X' to custom header(client can understand this is custom header)
    // search for build in headers in api
    // https://thevalleyofcode.com/http-request-headers/
    //console.log(req.myUserName); this api also get the data that send through first middleware
    return res.status(200).json(users);
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
    const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json({error: "user not found"});
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

    if(userIndex === -1) return  res.json({status:'failed', message: 'Id not found'});

    //Remove the user
    const deletedUser = users.splice(userIndex , 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null , 2), (err)=>{
        if(err) res.json({status: 'Error', message: err});
        res.json({status: 'success' , deleted: deletedUser[0]});
    });
})


app.post('/api/users' , (req , res) =>{
    const body = req.body;
    if(
        !body.first_name 
        || !body.last_name
        || !body.email 
        || !body.gender 
        || !body.job_title
    ){
        return res.status(400).json({msg: 'All fields are required'});
    }
    users.push({...body , id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err , data) =>{

    })
    console.log("Body" , body);
    return res.status(201).json ({status : "success" , id: users.length}); 
})
app.listen(PORT , () => console.log(`Server Started at PORT ${PORT}`)); 