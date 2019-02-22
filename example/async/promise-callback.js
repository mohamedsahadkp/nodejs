console.log("Start");

getUser(1)
    .then(user => getRepositories(user.name))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log("Commits :", commits))
    .catch(error => console.log("Error :", error));

console.log("End");

function getUser(id) {
    return new Promise((resolve, reject) => {
        console.log("Reading from database.....")
        setTimeout( ( )=> {
            resolve({
                id : id, userName: "Sahad" 
            });
        }, 2000);
    });
}

function getRepositories(name) {
    return new Promise((resolve, reject) => {
        console.log("Calling Github API for repositories....")
        setTimeout(() => {
            resolve(["repo1", "repo2", "repo3"])
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        console.log("Calling Github API for commits.....")
        setTimeout(() => {
            resolve(["commit1", "commit2", "commit3"])
        }, 2000);
    });
}