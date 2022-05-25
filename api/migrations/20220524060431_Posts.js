/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("posts", (table) => {
        table.increments();
        table.integer("user_id").unsigned()
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
        .alterTable("posts", (table) => {
            table.dropForeign("user_id")
        })
        .then(function () {
            return knex.schema.dropTableIfExists('posts');
        })
};
