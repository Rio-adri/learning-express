class TodosHandler {
    constructor(todosService) {
        this._todosService = todosService;

        this.getTodosHandler = this.getTodosHandler.bind(this);
        this.getTodoByIdHandler = this.getTodoByIdHandler.bind(this);
        this.postTodoHandler = this.postTodoHandler.bind(this);
        this.putTodoByIdHandler = this.putTodoByIdHandler.bind(this);
        this.deleteTodoByIdHandler = this.deleteTodoByIdHandler.bind(this);
    }

    async getTodosHandler (req, res, next) {
        try {
            const userId = req.user.id;
            const { task, completed } = req.query; 

            const todos = await this._todosService.getTodos(userId);
        
            if(task !== undefined || completed !== undefined) {
                const completedBool = completed === "true";
                const todosFilter = todos.data.filter((todo) => todo.task === task && todo.completed === completedBool);
        
                return res.status(200).json({
                    status: 'success',
                    data: todosFilter,
                });
            }
            
            if(todos.source === 'cache') res.set('X-Data-Source', 'cache');

            return res.status(200).json({
                status: 'success',
                data: todos.data || [],
            });
        } catch(error) {
            next(error);
        }
    }

    async getTodoByIdHandler(req, res, next) {
        try {
            const id  = req.params.id;
            const userId = req.user.id;
            
            const result = await this._todosService.getTodoById(userId, id);
            if (!result)
            return res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch(error) {
            next(error)
        }
    }

    async postTodoHandler(req, res, next) {
        try {
            const task = req.body.task;
            const userId = req.user.id;
        
            const id = await this._todosService.addTodo({ task, userId });
            
            return res.status(201).json({
                status: 'success',
                message: 'todo berhasil dibuat',
                data: id
            });
        } catch(error) {
            next(error);
        }
    }

    async putTodoByIdHandler(req, res, next) {
        try {
            const userId = req.user.id;
            const id = req.params.id;
            const { task, completed } = req.body;
        
            const resultId = await this._todosService.editTodo({ id, task, completed }, userId);
        
            return res.status(201).json({
                status: 'success',
                message: 'todo berhasil diedit',
                data: {
                    id : resultId,
                }
            });
        } catch(error) {
            next(error)
        }
    }

    async deleteTodoByIdHandler(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            await this._todosService.deleteTodo(id, userId);
        
            return res.status(200).json({
                status: 'success',
                message: 'todo berhasil dihapus'
            });
        } catch(error) {
            next(error);
        }
    }

}

module.exports = TodosHandler;