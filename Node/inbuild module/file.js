const fs = require("fs");

//write

fs.writeFileSync("file.txt","Hello Welcome Node");
console.log("File Created");

//read
var data = fs.readFileSync("file.txt","utf-8");
console.log(data)


//append

fs.appendFileSync("file.txt","using append");

//read

var data = fs.readFileSync("file.txt","utf-8");
console.log(data)

//delete

fs.unlinkSync("file.txt");
console.log("deleted");



