const express = require("express");
const {connectMongoDb } = require("./connection");

// middlewares
const {logReqRes} = require("./middlewares");

// routes 
const userRouter = require("./routes/user")


const app = express()
const PORT = 8081


//connection 
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=> console.log("mongodb connected"));

//middleware - plugin
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(logReqRes("log.txt"));
 
// Routes
app.use("/api/users" , userRouter);

app.listen(PORT , () => console.log(`Server Started at PORT ${PORT}`)); 