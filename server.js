const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const todosRouter = require('./src/api/todos/routes.js');
const morgan = require('morgan');
// const loggingMiddleware = require('./src/middleware/logger/loggingMiddleware.js');
const fs = require('fs');
const path = require('path');

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, './logs/access.log'),
    { flags: 'a' }
);


// app.use(loggingMiddleware);

app.use(morgan('combined', { stream: accessLogStream}))

app.use('/todos', todosRouter);

app.listen(port, host, () => {
    console.log(`Example app listening on port http://${host}:${port}`);
});