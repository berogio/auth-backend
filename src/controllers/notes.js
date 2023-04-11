import express from 'express';
import { Book } from '../models/note.js';

const notesRouter = express.Router();

notesRouter.get('/books', async(req, res) => {
    const booknotes = await Book.find({});
    res.json(booknotes);
});
notesRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname));
});

notesRouter.post('/books', (req, res, next) => {
    const Newbook = req.body;
    const book = new Book({
        ISBN: req.body.ISBN,
        Name: req.body.Name,
        Author: req.body.Author,
    });
    book.save()
        .then((book) => {
            res.sendStatus(201);
        })
        .catch(error => {
            next(error)
        });
});



notesRouter.delete('/deletebook', (req, res) => {
    const { ISBN } = req.body;
    Book.deleteOne({ ISBN }).remove().exec();
    res.sendStatus(204);
});


// notesRouter.use((req, res) => {
//     res.send('Page not found!');
// });

export {
    notesRouter,
};