import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import * as logger from './utils/loger.js';

import errorHandler from './utils/errorHandler.js';

import { PORT } from './utils/config.js';
import { notesRouter } from './controllers/notes.js';
import { usersRouter } from './controllers/user.js';

const app = express();

const __dirname = path.dirname('src');

app.use(cors({
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('uploads'));
app.use(express.static(`${__dirname}/src/public/dist/authentication/`));
app.use('/', notesRouter);

app.use(errorHandler);
app.use(usersRouter)

app.listen(PORT, () => {
    logger.info(` app listening on Port ${PORT}`);
});