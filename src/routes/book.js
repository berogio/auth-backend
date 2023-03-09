import express from 'express';
import mongoose from 'mongoose'

const router = express.Router();

const noteSchemaBooks = new mongoose.Schema({
    ISBN: String,
    Name: String,
    Img: String,
    Author: String,
});

const Book = mongoose.model('book', noteSchemaBooks)

router.get('/books', (req, res, next) => {

    Book.find({}, function(err, notes) {
        res.send(notes);
    });

    Book.find({})
        .then((notes) => {
            res.send(notes);
        })
        .catch(err => {
            res.status(400).end()
        })

})
router.post('/books', (req, res, next) => {
    const Newbook = req.body
    console.log(Newbook)
    const book = new Book(Newbook)
    book.save().then((book) => {
        console.log('new Book saved')
        res.sendStatus(201)
    })
})

router.get('/test', (req, res, next) => {

    res.send('test Work!')

})

export {
    router as bookRouter,
    noteSchemaBooks,
    Book,
}