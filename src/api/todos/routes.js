const express = require('express');
const router = express.Router();
const TodosHandler = require('./handler.js');
const TodosService = require('../../services/TodosService.js');
// const { validateTodo } = require('../../middleware/postsValidator.js');
const { validateTask, validateCompleted } = require('../../middleware/validation/bodyValidation.js');
const { paramValidation } = require('../../middleware/validation/paramValidation.js');
const { validationResultHandler } = require('../../middleware/validation/handler.js');
const { sanitizeXSS } = require('../../middleware/sanitation/sanitizeXSS.js');

const todosService = new TodosService();
const todosHandler = new TodosHandler(todosService);

router.get('', todosHandler.getTodosHandler);
router.get('/:id', paramValidation, validationResultHandler, todosHandler.getTodoByIdHandler);
router.post('', validateTask, validationResultHandler, sanitizeXSS, todosHandler.postTodoHandler);
router.put('/:id', paramValidation, validateTask, validateCompleted, validationResultHandler, sanitizeXSS, todosHandler.putTodoByIdHandler);
router.delete('/:id', paramValidation, validationResultHandler, todosHandler.deleteTodoByIdHandler)

module.exports = router;