const http= require("http");
const server = http.createServer((req,res)=>{
    if(req.url=="/"){
        res.end("Welcome to Home Page");
    }else if(req.url=="/about"){
        res.end("Welcome to About Page");
    }
    else if(req.url=="/contact"){
        res.end("Welcome to Contact Page");
    }
    else
    {
        res.end("Page not found");
    }
}
)
server.listen(4000, ()=>{
    console.log("Server is running on port 3000");
});
