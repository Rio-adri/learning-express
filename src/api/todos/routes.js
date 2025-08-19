import express from 'express';
const router = express.Router();
import TodosHandler from './handler.js';
import TodosModel from '../../models/TodosModel.js';
// import { validateTodo } from '../../middleware/postsValidator.js';
import { validateTask, validateCompleted, validationResultHandler } from '../../middleware/validation/bodyValidation.js';
import { sanitizeXSS } from '../../middleware/sanitation/sanitizeXSS.js';

const todosModel = new TodosModel();
const todosHandler = new TodosHandler(todosModel);

router.get('', todosHandler.getTodosHandler);
router.get('/:id', todosHandler.getTodoByIdHandler);
router.post('', validateTask, validationResultHandler, sanitizeXSS, todosHandler.postTodoHandler);
router.put('/:id', validateTask, validateCompleted, validationResultHandler, sanitizeXSS, todosHandler.putTodoByIdHandler);
router.delete('/:id', todosHandler.deleteTodoByIdHandler)

export default router;