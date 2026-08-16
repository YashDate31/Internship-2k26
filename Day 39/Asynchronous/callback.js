function greet(name,callback)
{
    console.log("Hello "+ name);
    callback();

}

function SayBye()
{
    console.log("Bye");
}

greet("Yash",SayBye);

