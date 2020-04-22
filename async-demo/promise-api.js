//Create a pre resolved promise
// const p = Promise.resolve({ id: 1, name: 'Cat' })

//Standar promises
// const p = Promise.reject(new Error('Reason for rejection'))

// p.then(res => console.log(res)).catch(err => console.log(err))

//Multiple promises
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1")
    resolve(1)
    // reject(new Error("You Broked it :("))
  }, 2000)
})

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2")
    resolve(2)
  }, 3000)
})

//Waits for all promises to complete
// Promise.all([p1, p2])
// .then(result => console.log("Finished", result))
// .catch(err => console.log("Error", err))

//Waits for at least one to complete
Promise.race([p1, p2])
  .then(result => console.log("Finished", result))
  .catch(err => console.log("Error", err))