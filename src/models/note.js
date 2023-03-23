import mongoose from 'mongoose';
import { MONGODB_URL } from '../utils/config.js';

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDb');
    })
    .catch((error) => {
        console.log(`${error}error connecting to MongoDb`);
    });

const noteSchemaBooks = new mongoose.Schema({
    ISBN: {
        type: String || Number,
        minLength: 4,
        required: true,
    },
    Name: {
        type: String,
        minLength: 1,
        required: true,
    },
    Img: String,
    Author: {
        type: String,
        minLength: 1,
        required: true,
    },
});

// delete __id and __v
noteSchemaBooks.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const noteSchema = new mongoose.Schema({
    Vorname: String,
    Nachname: String,
    Email: String,
    Password: String,
});

const Book = mongoose.model('book', noteSchemaBooks);
const User = mongoose.model('user', noteSchema);

export {
    Book,
    User,
};