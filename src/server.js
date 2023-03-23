import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import * as logger from './utils/loger.js';

import { PORT } from './utils/config.js';
import { notesRouter } from './controllers/notes.js';

const app = express();

const __dirname = path.dirname('src');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/src/public/dist/authentication/`));
app.use('/', notesRouter);

app.listen(8000, () => {
    logger.info(` app listening on Port ${PORT}`);
});