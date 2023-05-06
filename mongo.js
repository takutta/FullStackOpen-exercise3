const mongoose = require('mongoose')

const password = process.argv[2]

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const url = `mongodb+srv://takutta:${password}@cluster0.gepaqpx.mongodb.net/personApp`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
    process.exit(1)
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(() => {
    console.log(
      `Added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    )
    mongoose.connection.close()
  })
}
