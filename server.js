// thirdy package
const express = require('express');
const morgan = require('morgan');

// built in module
const fs = require('fs');
const path = require('path');

// env
const dotenv = require('dotenv');
dotenv.config();

// route
const todosRouter = require('./src/api/todos/routes.js');
const usersRouter = require('./src/api/users/routes.js');

// middleware
const exceptionsHandler = require("./src/middleware/exceptionsHandler/exceptionsHandler.js");
// const loggingMiddleware = require('./src/middleware/logger/loggingMiddleware.js');

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
app.use('/user', usersRouter);
app.use('/uploads', express.static(path.resolve(__dirname, "./uploads")));
app.use(exceptionsHandler);



app.listen(port, host, () => {
    console.log(`Example app listening on port http://${host}:${port}`);
});