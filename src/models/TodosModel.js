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
}

export default TodosModel;