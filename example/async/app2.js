console.log("Start");

getUser(1, getRepositories);

console.log("End");

function getRepositories(user) {
    console.log('User :', user);
    getRepositories1(user.userName, displayRepositories);
}

function displayRepositories(repos) {
    console.log('Repos :', repos)
}

function getUser(id, callback) {
    setTimeout( () => {
        console.log("Calling users from database.....")
        callback({
            id : id, userName: "Sahad" 
        });
    }, 2000);
}

function getRepositories1(name, callback) {
    setTimeout(() => {
        console.log("Calling repo from database....")
        callback(["repo1", "repo2", "repo3"]);
    }, 2000)
}

// function getCommits(repo, callback) {
//     setTimeout(() => {
//         console.log("Calling commits from database.....")
//         callback(["commit1", "commit2", "commit3"])
//     }, 2000)
// }