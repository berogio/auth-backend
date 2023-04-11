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

    await user.save()
        .then(() => {
            res.sendStatus(200)
        }).catch((error) => {
            res.status(400).send(error);
        });
});


usersRouter.post('/login', async(req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    await User.find({ Email: email, }, )
        .then(async(e) => {
            let validapss = await bcrypt.compare(password, e[0].passwordHash)
            if (validapss) {
                res.sendStatus(200)
            }
        }).catch(error => {
            res.status(401).json(error)
        });
});


export {
    usersRouter,
};