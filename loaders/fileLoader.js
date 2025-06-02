const fs = require("fs");

module.exports = function setPublic(dir){
    return function(req , res){
        try{
            const extention = (req.url).split(".").pop().replace(/[^\w]/ , '')
            const file = fs.readFileSync(`${dir}${req.url}`);

            if(extention == "js"){
                res.writeHead(200 , {"content-type" : "text/javascript"});
            }else if(extention == "html"){
                res.writeHead(200 , {"content-type" : "text/html"});
            }else if(extention == "json"){
                res.writeHead(200 , {"content-type" : "application/json"});
            }else if(extention == "css"){
                res.writeHead(200 , {"content-type" : "text/css"});
            }

            return res.end(file);
            
        }catch(error){
            // console.log(error);
            res.end("404 | File not found");
            return;
        }

    }
}