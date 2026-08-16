function getData(dataID)
{
    return new promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Data"+ dataID);
            resolve("data received..");
        },5000)
    })
}