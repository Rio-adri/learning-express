
class TodosHandler {
    constructor(todosService) {
        this._todosService = todosService;

        this.getTodosHandler = this.getTodosHandler.bind(this);
        this.getTodoByIdHandler = this.getTodoByIdHandler.bind(this);
        this.postTodoHandler = this.postTodoHandler.bind(this);
        this.putTodoByIdHandler = this.putTodoByIdHandler.bind(this);
        this.deleteTodoByIdHandler = this.deleteTodoByIdHandler.bind(this);
    }

    async getTodosHandler (req, res) {
        const { task, completed } = req.query; 

        const todos = await this._todosService.getTodos();
    
        if(task !== undefined || completed !== undefined) {
            const completedBool = completed === "true";
            const todosFilter = todos.filter((todo) => todo.task === task && todo.completed === completedBool);
    
            return res.status(200).json({
                status: 'success',
                data: todosFilter,
            });
        }
    
        return res.status(200).json({
            status: 'success',
            data: todos || [],
        });
    }

    async getTodoByIdHandler(req, res) {
        const id  = req.params.id;
        
        const result = await this._todosService.getTodoById(id);
    
        return res.status(200).json({
            status: 'success',
            data: result,
        });
    }

    async postTodoHandler(req, res) {
        const task = req.body.task;
    
        const id = await this._todosService.addTodo({ task });
        
        return res.status(201).json({
            status: 'success',
            message: 'todo berhasil dibuat',
            data: id
        });
    }

    async putTodoByIdHandler(req, res) {
        const id = req.params.id;
        const { task, completed } = req.body;
    
        const resultId = await this._todosService.editTodo({ id, task, completed});
       
        return res.status(201).json({
            status: 'success',
            message: 'todo berhasil diedit',
            data: {
                id : resultId,
            }
        });
    }

    async deleteTodoByIdHandler(req, res) {
        const { id } = req.params;

        await this._todosService.deleteTodo(id);
    
        return res.status(200).json({
            status: 'success',
            message: 'todo berhasil dihapus'
        });
    }

}

module.exports = TodosHandler;