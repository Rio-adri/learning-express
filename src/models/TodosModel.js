import { Pool } from "pg";
import { nanoid } from 'nanoid';

class TodosModel {
    constructor() {
        this._pool = new Pool();
    }

    async getTodos() {
        const query = {
            text: 'SELECT * FROM todos',
        }

        const result = await this._pool.query(query);

        return result.rows;
    }

    async getTodoById(id) {
        const query = {
            text: 'SELECT * FROM todos WHERE id=$1',
            values: [id]
        }

        const result = await this._pool.query(query);

        if(!result.rows[0]) {
            return "id tidak ditemukan";
        }

        return result.rows[0];
    }

    async addTodo({ task }) {
        const id = `todo-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO todos VALUES($1, $2) RETURNING id',
            values: [id, task],
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            return 'gagal';
        }

        return result.rows[0].id;
    }

    async editTodo({ id, task, completed}) {
        const query = {
            text: 'UPDATE todos SET task=$1, completed=$2 WHERE id=$3 RETURNING id',
            values: [task, completed, id],
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            return "gagal, id gak ada";
        }

        return result.rows[0].id;
    }

    async deleteTodo(id) {
        const query = {
            text: 'DELETE FROM todos WHERE id=$1 RETURNING id',
            values: [id]
        }

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            return 'id tidak ditemukan'
        }
    }
}

export default TodosModel;