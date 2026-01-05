const express = require("express");
const cookieParser = require("cookie-parser"); 

const path = require("path");
const { connectToMongoDB  } = require("./connect");
const {checkForAuthentication, restrictTo} = require("./middlewares/auth.js");
const URL = require('./models/url');



const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8081;

connectToMongoDB('mongodb://localhost:27017/short-url ')
.then(()=> console.log("MongoDB connected Successfully "));

app.set ("view engine" , "ejs");
app.set('views' , path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser()); 
app.use(checkForAuthentication);



//routes
app.use("/url", restrictTo(["NORMAL", "Normal"]) , urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);
app.get("/:shortId" ,async (req , res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        }, 
        {
            $push: {
            visitedHistory: {
                timestamp: Date.now(),
            },
            },
        }
    );
    res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`server Started at PORT: ${PORT}`)); 