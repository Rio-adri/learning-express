import express from 'express';
import dotenv from 'dotenv';
import todosRouter from './src/api/todos/routes.js';
import morgan from 'morgan';
// import loggingMiddleware from './src/middleware/loggingMiddleware.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, './src/resource/log/access.log'),
    { flags: 'a' }
);


// app.use(loggingMiddleware);

app.use(morgan('combined', { stream: accessLogStream}))

app.use('/todos', todosRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});