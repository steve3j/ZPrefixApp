/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("Posts", (table) => {
        table.increments();
        table.string("user_id", 50)
        table.foreign("user_id").references("users.id")
        table.string("title", 50)
        table.string("content", 1000)
        table.string("password", 50)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .alterTable("users", (table) => {
            table.dropForeign("users_id")
        })
        .then(function () {
            return knex.schema.dropTableIfExists('Posts');
        })
};
