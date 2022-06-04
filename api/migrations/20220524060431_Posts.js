/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("posts", (table) => {
        table.increments();
        table.integer("user_id").unsigned()
        table.foreign("user_id").references("users.id")
        table.string("title")
        table.string("content", 2000)
        table.date("creation_date")
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
