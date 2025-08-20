import express from 'express';
const router = express.Router();
import TodosHandler from './handler.js';
import TodosModel from '../../models/TodosModel.js';
// import { validateTodo } from '../../middleware/postsValidator.js';
import { validateTask, validateCompleted } from '../../middleware/validation/bodyValidation.js';
import { paramValidation } from '../../middleware/validation/paramValidation.js';
import { validationResultHandler } from '../../middleware/validation/handler.js';
import { sanitizeXSS } from '../../middleware/sanitation/sanitizeXSS.js';

const todosModel = new TodosModel();
const todosHandler = new TodosHandler(todosModel);

router.get('', todosHandler.getTodosHandler);
router.get('/:id', paramValidation, validationResultHandler, todosHandler.getTodoByIdHandler);
router.post('', paramValidation, validateTask, validationResultHandler, sanitizeXSS, todosHandler.postTodoHandler);
router.put('/:id', paramValidation, validateTask, validateCompleted, validationResultHandler, sanitizeXSS, todosHandler.putTodoByIdHandler);
router.delete('/:id', paramValidation, validationResultHandler, todosHandler.deleteTodoByIdHandler)

export default router;