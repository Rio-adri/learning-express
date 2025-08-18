import express from 'express';
const router = express.Router();
import TodosHandler from './handler.js';
import TodosModel from '../../models/TodosModel.js';

const todosModel = new TodosModel();
const todosHandler = new TodosHandler(todosModel);

router.get('', todosHandler.getTodosHandler);
router.post('', todosHandler.postTodoHandler);

export default router;