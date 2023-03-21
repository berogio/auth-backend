import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const url =
    `mongodb+srv://gberi2012:${process.env.DB_PASSWORD}@cluster0.a2bfzeu.mongodb.net/test`
mongoose.set('strictQuery', false);


mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDb')
    })
    .catch((error) => {
        console.log('error connecting to MongoDb')
    })


const noteSchemaBooks = new mongoose.Schema({
    ISBN: String,
    Name: String,
    Img: String,
    Author: String,
});

//delete __id and __v
noteSchemaBooks.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const noteSchema = new mongoose.Schema({
    Vorname: String,
    Nachname: String,
    Email: String,
    Password: String,
})



const Book = mongoose.model('book', noteSchemaBooks)
const User = mongoose.model('user', noteSchema)

export {
    Book,
    User
}