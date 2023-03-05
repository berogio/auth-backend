import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import path from 'path';
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()

const __dirname = path.dirname('src');
const port = 3000

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/src/public/dist/authentication'))

//mongoose

const url =
    `mongodb+srv://gberi2012:${process.env.DB_PASSWORD}@cluster0.a2bfzeu.mongodb.net/test`
mongoose.set('strictQuery', false);

const noteSchema = new mongoose.Schema({
    Vorname: String,
    Nachname: String,
    Email: String,
    Password: String,
})

const User = mongoose.model('user', noteSchema)

mongoose.connect(url)


app.get('/', (req, res, next) => {

    res.sendFile(path.join(__dirname))

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

app.listen(8000, () => {
    console.log(` app listening on port ${port}`);
})