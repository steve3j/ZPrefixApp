/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'baby', last_name: 'internet', username: 'babe1', password: 'lalala'},
    {first_name: 'mommy', last_name: 'internet', username: 'mom1', password: 'naptime'},
  ]);
};
