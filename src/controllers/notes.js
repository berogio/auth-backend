import express from 'express';
import { Book } from '../models/note.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


const notesRouter = express.Router();

notesRouter.get('/books', async(req, res) => {
    const booknotes = await Book.find({});
    res.json(booknotes);
});
notesRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname));
});

notesRouter.post('/books', upload.single('prductImage'), (req, res, next) => {
    const Newbook = req.body;
    const book = new Book({
        ISBN: req.body.ISBN,
        Name: req.body.Name,
        Author: req.body.Author,
        prductImage: req.file.path
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