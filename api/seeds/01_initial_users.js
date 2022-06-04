/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'baby', last_name: 'internet', username: 'babe1', password: 'lalala', creation_date: new Date(2022, 0, 1).toISOString().split("T")[0]},
    {first_name: 'mommy', last_name: 'internet', username: 'mom1', password: 'naptime', creation_date: new Date(2022, 0, 1).toISOString().split("T")[0]},
  ]);
};
