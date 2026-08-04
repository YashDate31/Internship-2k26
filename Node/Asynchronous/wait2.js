function getdata(dataid)
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{console.log("Data: "+ dataid);
            resolve();
        },3000)
    })
}
async function fetchdata()
{
    console.log("Fetching data 1..");
    await getdata(13);
    console.log("Fetching data 2..");
    await getdata(22);
    console.log("Fetching data 3..");
    await getdata(33);
    console.log("Fetching data 4..");
    await getdata(44);
    console.log("All data fetched..");
    
}
fetchdata();