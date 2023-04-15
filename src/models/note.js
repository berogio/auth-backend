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
    Author: {
        type: String,
        minLength: 1,
        required: true,
    },
    prductImage: {
        type: String,
        require: true,
    }
});

// delete __id and __v armushaobs!
noteSchemaBooks.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const noteSchemaUsers = new mongoose.Schema({
    Vorname: {
        type: String || Number,
        required: true,
    },
    Nachname: {
        type: String || Number,
        required: true,
    },
    Email: {
        type: String || Number,
        required: true,
    },
    passwordHash: {
        type: String || Number,
        required: true,
    }
});

const Book = mongoose.model('book', noteSchemaBooks);
const User = mongoose.model('user', noteSchemaUsers);

export {
    Book,
    User,
};