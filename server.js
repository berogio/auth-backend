import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose'

const app = express()

app.use(cors());
app.use(bodyParser.json());

//mongose

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://gberi2012:${password}@cluster0.a2bfzeu.mongodb.net/test`
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

    res.send('data')

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
        } else res.sendStatus(404)
    })
})

app.listen(8000, () => {
    console.log('server Started on port 8000');
})

// if (data[0].Email === email) {
//     res.sendStatus(200)
// } else console.log('ara')