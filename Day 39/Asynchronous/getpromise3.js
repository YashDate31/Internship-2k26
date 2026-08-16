const getPromise = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Data received..");
            resolve("Success");
            // reject("Network error");

        },3000)
    })
}

let p = getPromise();
p.then((res)=>{
    console.log("Promise resolved: "+ res);
})
p.catch((err)=>{
    console.log("Promise rejected: "+ err);
})