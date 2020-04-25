const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://ryan:test@cluster0-ijoja.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB!!!"))
  .catch((err) => console.error("Could not connect to MongoDB :(", err))

//Defines shape of data
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean
})

//Model defines an object and is a class
const Course = mongoose.model('Course', courseSchema)


async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Ryan",
    tags: ["angular", "frontend"],
    isPublished: true
  })

  const result = await course.save()
  console.log("Result", result)
}

//Logical operators
//or
//and
// .find // choose a method then call or() or and() and pass in an array of objects you need to decide between.
// .or([{ author: 'Ryan' }, { isPublished: true }])
// .and([{ author: 'Ryan' }, { isPublished: true }])

//Regular Expressions :(
// Starts with : 
// .find({ author: /^Ryan/ }) the ^ indicates that it starts with something

//Ends with
// .find({autohor: /Kegerreis$/i}) $ means ends with

//Case sensitivity is indicated with an i

//Contains Ryan
// .find({author: /.*Ryan.*/})



async function findCourses() {
  const pageNumber = 2
  const pageSize = 10

  const courses = await Course
    .find()
    // .find({ author: 'Ryan', isPublished: true })
    // .find({ price: { $gt: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // .find({ author: 'Ryan' })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({ name: 1 })
  // .count()
  // .select({ name: 1, tags: 1 })
  console.log(courses)
}

findCourses()

// createCourse()