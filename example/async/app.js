console.log("Start");

getUser(1, (user) => {
    console.log('User :', user);
    getRepo(user.userName, (repos) => {
        console.log('Repo :' + repos);
    });
});

console.log("End");


function getUser(id, callback) {
    setTimeout( ( )=> {
        callback({
            id : id, userName: "Sahad" 
        });
    }, 2000);
}

function getRepo(name, callback) {
    setTimeout(() => {
        callback(["repo1", "repo2", "repo3"])
    }, 2000)
}