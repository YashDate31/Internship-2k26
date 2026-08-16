const http = require("http");

const server = http.createServer((req,res)=>
{
    res.end("Hello from the server, server is working properly");
});


server.listen(5000, () => { 
    console.log("Server is running on port 5000"); 
});