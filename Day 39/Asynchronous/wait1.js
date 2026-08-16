function api()
{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{console.log("Weather data fetched..");
            resolve();
        },3000);
    });
}
async function fetchweather()
{
    await api();
    console.log("Console..");
}
fetchweather();