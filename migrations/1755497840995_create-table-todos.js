/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('todos', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        task: {
            type: 'VARCHAR(255)',
            notNull: true,
        },
        completed: {
            type: 'BOOLEAN',
            notNull: true,
            default: false
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('todos');
};