import express from 'express';
const router = express.Router();
import TodosHandler from './handler.js';
import TodosModel from '../../models/TodosModel.js';
// import { validateTodo } from '../../middleware/postsValidator.js';
import { validateTask, validateCompleted } from '../../middleware/validation/bodyValidation.js';
import { paramValidation } from '../../middleware/validation/paramValidation.js';
import { validationResult } from 'express-validator';
import { sanitizeXSS } from '../../middleware/sanitation/sanitizeXSS.js';

const todosModel = new TodosModel();
const todosHandler = new TodosHandler(todosModel);

router.get('', todosHandler.getTodosHandler);
router.get('/:id', paramValidation, validationResult, todosHandler.getTodoByIdHandler);
router.post('', paramValidation, validateTask, validationResult, sanitizeXSS, todosHandler.postTodoHandler);
router.put('/:id', paramValidation, validateTask, validateCompleted, validationResult, sanitizeXSS, todosHandler.putTodoByIdHandler);
router.delete('/:id', paramValidation, validationResult, todosHandler.deleteTodoByIdHandler)

export default router;