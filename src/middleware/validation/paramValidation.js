import { param } from 'express-validator';

export const paramValidation = 
    param('id').
        isString().
        withMessage('Id harus bertipe string').
        trim().
        escape();

