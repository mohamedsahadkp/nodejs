console.log("Start");

getUser(1, (user) => {
    getRepo(user.userName, (repos) => {
        getCommits(repos[0], (commits) => {
            console.log('Commits :', commits);
        });
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

function getCommits(repo, callback) {
    setTimeout(() => {
        callback(["commit1", "commit2", "commit3"])
    }, 2000)
}