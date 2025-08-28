const {body} = require('express-validator');
// export const validateTodo = (req, res, next) => {
//     const { task } = req.body;

//     if (!task) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'task harus diisi'
//         });
//     }

//     if(typeof task !== 'string') {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'task harus bertipe string'
//         });
//     }

//     next();
// }

const validateTask = 
    body('task').
        isString().
        withMessage('Task harus bertipe string').
        notEmpty().
        withMessage('Task tidak boleh kosong').
        isLength({
            min: 10,
            max: 50
        }).
        withMessage('Task Minimal 10 karakter dan maksimal 50 karakter').
        trim().
        escape();

const validateCompleted = 
    body('completed').
        isBoolean().
        withMessage('completed harus true atau false');

module.exports = { validateTask, validateCompleted };