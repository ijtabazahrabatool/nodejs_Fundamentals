const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req , res) =>{
    if(req.url === "/favicon.ico") return req.end();
    const log = `${Date.now()} : ${req.url} Request happened\n`;
    const myUrl = url.parse(req.url , true); // parse the url 
    console.log(myUrl);
    fs.appendFile("logDetails.txt" , log , (err , data) => {
    
        switch(myUrl.pathname){
            case '/': 
                res.end("Home Page");
                break;
            case '/about': 
                const userName = myUrl.query.myname;  
                res.end(`Hi I am ${userName}`);
            case '/search':
                const search = myUrl.query.search_query;
                res.end("Here are you response for result " + search);
                break;
            case '/contact-us': 
                res.end("+922434534534");
                break;
            default: res.end("404 Not found");
        }
    });
    //console.log(req);

});

myServer.listen(8000 , () => console.log("Server Started!"));