import express from 'express';
const router = express.Router();
import TodosHandler from './handler.js';
import TodosModel from '../../models/TodosModel.js';
// import { validateTodo } from '../../middleware/postsValidator.js';
import { validateTodoPost } from '../../middleware/postsValidator.js';
import { sanitizeXSS } from '../../middleware/postsSanitation.js';

const todosModel = new TodosModel();
const todosHandler = new TodosHandler(todosModel);

router.get('', todosHandler.getTodosHandler);
router.get('/:id', todosHandler.getTodoByIdHandler);
router.post('', validateTodoPost, sanitizeXSS, todosHandler.postTodoHandler);
router.put('/:id', todosHandler.putTodoByIdHandler);
router.delete('/:id', todosHandler.deleteTodoByIdHandler)

export default router;