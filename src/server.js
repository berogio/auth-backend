import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import * as logger from './utils/loger.js';
import { Book, User } from './notes/note.js';
import { PORT } from './utils/config.js';

logger.error;
logger.info;

const app = express();

const __dirname = path.dirname('src');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/src/public/dist/authentication/`));

app.get('/books', async (req, res) => {
  const booknotes = await Book.find({});
  res.json(booknotes);
});

app.post('/books', (req, res) => {
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

app.post('/registration', (req, res) => {
  const UserData = req.body;
  const user = new User(UserData);
  user.save()
    .then((user) => {
      res.send(user);
    }).catch((reson) => {
      res.status(400).send(reson);
    });
});

app.post('/login', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  User.find({ Email: email, Password: password }, (err, data) => {
    if (data.length > 0) {
      res.sendStatus(200);
    } else res.sendStatus(401);
  });
});
app.delete('/deletebook', (req, res) => {
  const { ISBN } = req.body;
  Book.deleteOne({ ISBN }).remove().exec();
  res.sendStatus(204);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname));
});

app.use((req, res) => {
  res.send('Page not found!');
});

app.listen(8000, () => {
  logger.info(` app listening on Port ${PORT}`);
});
