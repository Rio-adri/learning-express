const { param } = require('express-validator');

const paramValidation = 
    param('id').
        isString().
        withMessage('Id harus bertipe string').
        trim().
        escape();

module.exports = { paramValidation };
