const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");


const  router = express.Router();
router.get('/admin/urls', restrictTo(["ADMIN" , "Admin"]) ,async(req , res)=>{ 
    const allurls = await URL.find();
    return res.render('home', {
        urls: allurls
    });
});

router.get("/" ,restrictTo(["NORMAL", "Normal", "Admin" , "ADMIN"]) ,async(req , res)=>{ 
    const allurls = await URL.find({createdBy: req.user._id});
    return res.render('home', {
        urls: allurls
    });
});


router.get("/signup", (req,res)=>{ 
     res.render("signup");
})

router.get("/login", (req,res)=>{
     res.render("login");
}) 

module.exports = router;