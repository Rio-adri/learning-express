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
    
            res.status(200).json({
                status: 'success',
                data: todosFilter,
            });
        }
    
        res.status(200).json({
            status: 'success',
            data: todos,
        });
    }

    async getTodoByIdHandler(req, res) {
        const id  = req.params.id;
        
        const index = todos.findIndex((todo) => todo.id === id );
    
        if(index === -1) {
            res.status(404).json({
                status: 'fail',
                message: 'id todo tidak ditemukan',
            });
        }
    
        res.status(200).json({
            status: 'success',
            data: todos[index],
        });
    }

    async postTodoHandler(req, res) {
        const task = req.body.task;
    
        const id = await this._todosModel.addTodo({ task });
        
        res.status(201).json({
            status: 'success',
            message: 'todo berhasil dibuat',
            data: id
        });
    }

    async putTodoHandler(req, res) {
        const id = req.params.id;
        const { task, completed } = req.body;
    
        const index = todos.findIndex((todo) => todo.id === id );
    
        if (index > -1) {
            todos[index] = {
                ...todos[index],
                task,
                completed
            }
        }
       
        res.status(201).json({
            status: 'success',
            message: 'todo berhasil diedit',
            data: {
                id : todos[index].id,
            }
        });
    }

    async deleteTodoHandler(req, res) {
        const { id } = req.params;
    
        const index = todos.findIndex((todo) => todo.id === id);
    
        if (index === -1 ) {
            res.status(404).json({
                status: 'fail',
                message: 'id tidak ditemukan',
            });
        }
    
        todos.splice(index, 1);
    
        res.status(200).json({
            status: 'success',
            message: 'todo berhasil dihapus'
        });
    }

}

export default TodosHandler;