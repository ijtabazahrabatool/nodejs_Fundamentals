const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) =>{
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()} : ${req.method} ${req.url} New Request Received\n`;
    const myUrl = url.parse(req.url , true);
    //console.log(myUrl);  //t parses the URL into a structured object (pathname + query parameters)
    fs.appendFile("../04_url/logDetails.txt", log, (err , data) =>{
         switch(myUrl.pathname){
            case '/': 
                if(req.method === 'GET') res.end("Home Page");
                break;
            case '/about': 
                const userName = myUrl.query.myname;  
                res.end(`Hi I am ${userName}`);
                break;
            case '/search':
                const search = myUrl.query.search_query;
                res.end("Here are you response for result " + search);
                break;
            case '/signup':
                if(req.method === 'GET') res.end("This is a signup form ");
                else if (req.method === 'POST'){
                    //db Query
                    res.end("Successful");
                }
                break;

            case '/contact-us': 
                res.end("+922434534534");
                break;
            default: res.end("404 Not found");
        }
    });
});

myServer.listen(8000 , () => console.log("Server Started!"));