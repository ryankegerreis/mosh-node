const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId)
  course.authors.push(author)
  course.save()
}

async function deleteAuthor(courseId, authorId) {
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()
}

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  await Course.updateOne({ _id: courseId }, {
    $unset: {
      'author': ''
    }
  })
}

// createCourse('Node Course',
//   [
//     new Author({ name: 'John' }),
//     new Author({ name: 'Bill' }),
//   ]);

// updateAuthor('5eaebc0e06aba508fd261a67')

// addAuthor('5eaec0f453f47a0a5d3cf5e1', new Author({ name: 'Amy' }))

// deleteAuthor('5eaec0f453f47a0a5d3cf5e1', '5eaec26e09db970ab513feb8')
