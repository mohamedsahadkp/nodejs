
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Aysnc operation 1 .....")
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async operation 2 ......")
        resolve(2);
        //reject(new Error("Error"));
    }, 2000);
});

// Return only after complete all promise
Promise.all([p1 ,p2])
    .then(result => {
        console.log("Result :" + result);
        console.log("Result :" + typeof(result));
    })
    .catch(err => {
        console.log("Error :", err.message);
    });

// Return any one of promise complete
Promise.race([p1, p2])
    .then(result => {
        console.log("Result :" + result);
    });
