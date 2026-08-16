function getdata1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data 1");
            resolve(200);
        }, 2000);
    });
}

function getdata2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data 2");
            resolve(200);
        }, 2000);
    });
}

console.log("fetching data 1....");

getdata1().then((res) => {
    console.log("fetching data 2....");
    
    getdata2().then((res) => {
        console.log("All data fetched.");
    });
});