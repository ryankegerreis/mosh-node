//Callbacks
// console.log("Before")
// getUser(1, userToCommits)
// console.log("After")

// function displayCommits(commits) {
//   console.log(commits)
// }

// function userToCommits(user) {
//   getRepositories(user.name, displayCommits)
// }

//Callback version
function getUser(id) {
  return new Promise((resolve, reject) => {
    //Async stuff
    setTimeout(() => {
      console.log("Reading user from db")
      resolve({ id: id, name: "Ryan" })
    }, 1000)
  })
}

//Promise version getUser
const p = getUser(1)
  .then(user => getRepositories(user.name))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log(commits))
  .catch(err => console.log('Error', err.message))



//Async version getUser
async function displayCommits() {
  try {
    //Async and await
    const user = await getUser(1)
    const repos = await getRepositories(user.name)
    const commits = await getCommits(repos[0])
    console.log("Commits", commits)
  } catch (err) {
    console.log("error", err)
  }
}

displayCommits()




function getRepositories(userName) {
  return new Promise((resolve, reject) => {
    //Async stuff
    setTimeout(() => {
      console.log("Getting repos")
      resolve(['repo1', 'repo2', 'repo3'])
    }, 1000)
  })
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    //Async
    setTimeout(() => {
      console.log("Getting commits")
      resolve(['commit'])
    }, 1000)
  })
}

