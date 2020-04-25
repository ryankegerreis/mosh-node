const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB!!!"))
  .catch((err) => console.error("Could not connect to MongoDB :(", err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
  date: { type: Date, default: Date.now() },
  tags: [String]
})

const Course = mongoose.model('Course', courseSchema)

//ex 1
// async function getCourses() {
//   return await Course
//     .find({ isPublished: true, tags: 'backend' })
//     .sort('name')
//     .select({ name: 1, author: 1 })
// }

//ex 2
// async function getCourses() {
//   return await Course
//     //One way of doing it
//     // .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
//     .find({ isPublished: true })
//     .or([{ tags: 'backend' }, { tags: 'frontend' }])
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1 })
// }

//ex 3
async function getCourses() {
  return await Course
    .find({ isPublished: true })
    .or([
      { price: { $gte: 15 } },
      { name: /.*by*/i }
    ])
}

async function run() {
  const courses = await getCourses()
  console.log('Here they are', courses)
}

run()