import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import Book from './notes/note.js'
import User from './notes/note.js'


const app = express()

const __dirname = path.dirname('src');
const port = 8000

app.use(cookieParser())
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/src/public/dist/authentication/'))



app.get('/books', async(req, res, next) => {

    const booknotes = await Book.find({})

    res.json(booknotes)
})

app.post('/books', (req, res, next) => {
    const Newbook = req.body
    console.log(Newbook)

    const book = new Book(Newbook)
    book.save().then((book) => {
        console.log('new Book saved')
        res.sendStatus(201)
    })
})

app.post('/registration', (req, res, next) => {
    const UserData = req.body
    const user = new User(UserData)
    user.save().then((user) => {
        console.log('new user saved')
        res.send(user)
    })
})

app.post('/login', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    User.find({ Email: email, Password: password }, (err, data) => {
        if (data.length > 0) {
            res.sendStatus(200)
        } else res.sendStatus(401)
    })
})







app.get('/', (req, res, next) => {

    res.sendFile(path.join(__dirname))

})

app.use((req, res) => {
    res.send('Page not found!')
});

app.listen(8000, () => {
    console.log(` app listening on Port ${port}`);
})