const express = require('express');
const router = express.Router();
const TodosHandler = require('./handler.js');
const TodosService = require('../../services/TodosService.js');
// const { validateTodo } = require('../../middleware/postsValidator.js');
const { validateTask, validateCompleted } = require('../../middleware/validation/todo/bodyValidation.js');
const { paramValidation } = require('../../middleware/validation/todo/paramValidation.js');
const jwtValidation = require("./../../middleware/authentication/jwtValidation.js");
const { validationResultHandler } = require('../../middleware/validation/todo/handler.js');
const { sanitizeXSS } = require('../../middleware/sanitation/sanitizeXSS.js');
const CacheService = require('../../services/redis/CacheService.js');
const upload = require('../../middleware/uploadsHandler/uploadsHandler.js');
const path = require("path");

const cacheService = new CacheService();
const todosService = new TodosService(cacheService);
const todosHandler = new TodosHandler(todosService);

router.get('', jwtValidation, todosHandler.getTodosHandler);
router.get('/:id', jwtValidation, paramValidation, validationResultHandler, todosHandler.getTodoByIdHandler);
router.post('', jwtValidation, upload.single("images"), validateTask, validationResultHandler, sanitizeXSS, todosHandler.postTodoHandler);
router.put('/:id', jwtValidation, paramValidation, validateTask, validateCompleted, validationResultHandler, sanitizeXSS, todosHandler.putTodoByIdHandler);
router.delete('/:id', jwtValidation, paramValidation, validationResultHandler, todosHandler.deleteTodoByIdHandler);

module.exports = router;