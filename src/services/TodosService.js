const { nanoid } = require('nanoid');
const { Todo } = require('../models/Todo.js');

class TodosService {
    async getTodos() {
        try {
            const todos = await Todo.findAll();

            return todos;
        } catch(error) {
            return error;
        }
    }

    async getTodoById(id) {
        try {
            const todo = await Todo.findByPk(id);

            if(!todo) {
                return 'data tidak ditemukan'
            }

            return todo
        } catch(error) {
            return error
        }
    }

    async addTodo({ task }) {
        try {
            const id = `todo-${nanoid(16)}`;
            const newTask = await Todo.create({
                id,
                task,
            });

            return newTask.id;
        } catch(error) {
            return error;
        }
    }

    async editTodo({ id, task, completed}) {
       const newData = {
        id,
        task,
        completed
       }

       const [updateCount, updateTodos] = await Todo.update(newData, {
        where: {
            id
        },
        returning: true,
       });

       return updateTodos[0].id;
    }

    async deleteTodo(id) {
       try {
        const deletedRows = await Todo.destroy({
            where: {
                id
            }
        });

        if(deletedRows === 0) {
            return "gagal dihapus"
        }

        return "Berhasil dihapus";
       } catch(error) {
        return error;
       }
    }
}

module.exports = TodosService;