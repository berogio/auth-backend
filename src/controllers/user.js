import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/note.js';

const usersRouter = express.Router();

usersRouter.post('/registration', async(req, res) => {
    const { Vorname, Nachname, Email, Password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(Password, saltRounds)
    const user = new User({
        Vorname,
        Nachname,
        Email,
        passwordHash,

    });
    console.log(user)
    await user.save()
        .then(() => {
            res.sendStatus(201)
        }).catch((error) => {
            res.status(400).send(error);
        });
});

usersRouter.post('/login', (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    User.find({ Email: email, Password: password }, (err, data) => {
        if (data.length > 0) {
            res.sendStatus(200);
        } else res.sendStatus(401);
    });
});

export {
    usersRouter,
};