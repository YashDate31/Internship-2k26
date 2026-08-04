function getdata(dataID,callback)
{
    setTimeout(()=>
    {
        console.log("data: "+dataID);
        if(callback)
        {
            callback();
        }
    },
    2000);
}
console.log("fetching data 1....");
getdata(50,()=>
{
    console.log("fetching data 2....");
    getdata(34,()=>
    {
        console.log("fetching data 3....");
        getdata(32,()=>
        {
            console.log("All data fetched.");
        });
    });
});