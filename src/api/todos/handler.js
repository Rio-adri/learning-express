import autoBind from "auto-bind";

class TodosHandler {
    constructor(todosModel) {
        this._todosModel = todosModel;

        autoBind(this);
    }

    async getTodosHandler (req, res) {
        const { task, completed } = req.query; 

        const todos = await this._todosModel.getTodos();
    
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
        
        const result = await this._todosModel.getTodoById(id);
    
        return res.status(200).json({
            status: 'success',
            data: result,
        });
    }

    async postTodoHandler(req, res) {
        const task = req.body.task;
    
        const id = await this._todosModel.addTodo({ task });
        
        return res.status(201).json({
            status: 'success',
            message: 'todo berhasil dibuat',
            data: id
        });
    }

    async putTodoByIdHandler(req, res) {
        const id = req.params.id;
        const { task, completed } = req.body;
    
        const resultId = await this._todosModel.editTodo({ id, task, completed});
       
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

        await this._todosModel.deleteTodo(id);
    
        return res.status(200).json({
            status: 'success',
            message: 'todo berhasil dihapus'
        });
    }

}

export default TodosHandler;