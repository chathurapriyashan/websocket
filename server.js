const http = require("http");
require("./socket");
const load = require("./templateEngine/load");
const fileLoader = require("./loaders/fileLoader");

const publicFileLoader = fileLoader("./public");



const server = http.createServer((req , res)=>{

    const reqPath = req.url;
    console.log(reqPath);

    switch(reqPath){
        case "/":
            res.end(load("./public/index.html"));
            return;    
    }
            
    publicFileLoader(req, res);    

});




server.listen(3000 , "0.0.0.0" , ()=>{
    console.log("server started");
})

