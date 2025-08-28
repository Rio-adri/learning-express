const { nanoid } = require('nanoid');
const Todo = require('../models/Todo.js');

class TodosService {
    async getTodos(userId) {
        try {
            const todos = await Todo.findAll({
                where: {
                    owner: userId,
                }
            });

            return todos;
        } catch(error) {
            return error;
        }
    }

    async getTodoById(userId, id) {
        try {
            const todo = await Todo.findOne({
                where: {
                    owner: userId,
                    id
                }
            });

            if(!todo) {
                return 'data tidak ditemukan'
            }

            return todo
        } catch(error) {
            return error
        }
    }

    async addTodo({ task, userId }) {
        try {
            const id = `todo-${nanoid(16)}`;
            const newTask = await Todo.create({
                id,
                task,
                owner: userId
            });

            return newTask.id;
        } catch(error) {
            return error;
        }
    }

    async editTodo({ id, task, completed }, userId) {
       const newData = {
        id,
        task,
        completed
       }

       const [updateCount, updateTodos] = await Todo.update(newData, {
        where: {
            id,
            owner: userId
        },
        returning: true,
       });

       return updateTodos[0].id;
    }

    async deleteTodo(id, userId) {
       try {
        const deletedRows = await Todo.destroy({
            where: {
                id,
                owner: userId,
            }
        });

        if(deletedRows === 0) {
            return "gagal dihapus";
        }

        return "Berhasil dihapus";
       } catch(error) {
        return error;
       }
    }
}

module.exports = TodosService;