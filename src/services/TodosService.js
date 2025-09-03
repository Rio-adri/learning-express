const { nanoid } = require('nanoid');
const Todo = require('../models/Todo.js');
const NotFoundError = require("../exceptions/NotFoundError.js");
const InvariantError = require('../exceptions/InvariantError.js');

class TodosService {
    constructor(cacheService) {
        this._cacheService = cacheService;
    }

    async getTodos(userId) {
        try {
            const result = await this._cacheService.get(`user-todos:${userId}`);

            return {
                source: 'cache',
                data: JSON.parse(result),
            }
        } catch {
            const todos = await Todo.findAll({
                where: {
                    owner: userId,
                }
            });
            
            await this._cacheService.set(`user-todos:${userId}`, JSON.stringify(todos));
            
            return {
                source: 'db',
                data: todos
            };
        }
    }

    async getTodoById(userId, id) {
        const todo = await Todo.findOne({
            where: {
                owner: userId,
                id
            }
        });

        if(!todo) {
            throw new NotFoundError("Data tidak ditemukan");
        }

        return todo
    
    }

    async addTodo({ task, userId }) {
        const id = `todo-${nanoid(16)}`;

        const newTask = await Todo.create({
            id,
            task,
            owner: userId,
        });

        await this._cacheService.delete(`user-todos:${userId}`);

        return newTask.id;
    }

    async editTodo({ id, task, completed }, userId) {
    
        const newData = {
            id,
            task,
            completed,
        }
       

       const [updateCount, updateTodos] = await Todo.update(newData, {
        where: {
            id,
            owner: userId
        },
        returning: true,
       });

       await this._cacheService.delete(`user-todos:${userId}`);

       return updateTodos[0].id;
    }

    async deleteTodo(id, userId) {
        const deletedRows = await Todo.destroy({
            where: {
                id,
                owner: userId,
            }
        });

        if(deletedRows === 0) {
            throw new InvariantError("Task Gagal dihapus");
        }

        await this._cacheService.delete(`user-todos:${userId}`);

        return "Berhasil dihapus";
       
    }
}

module.exports = TodosService;