import express from 'express';
import { Book, User } from '../models/note.js';

const notesRouter = express.Router();

notesRouter.get('/books', async(req, res) => {
    const booknotes = await Book.find({});
    res.json(booknotes);
});
notesRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname));
});


notesRouter.post('/books', (req, res) => {
    const Newbook = req.body;
    const book = new Book({
        ISBN: req.body.ISBN,
        Name: req.body.Name,
        Author: req.body.Author,
    });
    book.save()
        .then((book) => {
            res.sendStatus(201);
        }).catch((reson) => {
            if (reson.name === 'ValidationError') {
                res.status(400).send({ error: reson.message });
            }
        });
});

notesRouter.post('/registration', (req, res) => {
    const UserData = req.body;
    const user = new User(UserData);
    user.save()
        .then((user) => {
            res.send(user);
        }).catch((reson) => {
            res.status(400).send(reson);
        });
});

notesRouter.post('/login', (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    User.find({ Email: email, Password: password }, (err, data) => {
        if (data.length > 0) {
            res.sendStatus(200);
        } else res.sendStatus(401);
    });
});

notesRouter.delete('/deletebook', (req, res) => {
    const { ISBN } = req.body;
    Book.deleteOne({ ISBN }).remove().exec();
    res.sendStatus(204);
});


notesRouter.use((req, res) => {
    res.send('Page not found!');
});


export {
    notesRouter,
};