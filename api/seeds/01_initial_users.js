/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'baby', last_name: 'internet', username: 'babe1', password: 'lalala', creation_date: new Date(2022, 0, 1)},
    {first_name: 'a', last_name: 'a', username: 'a', password: '$2a$10$ecj1Kj77HZ6HsMcgOyrLuuA1.8UOAAP4bUZSkm.H/8Bt/XP5bHyTq', creation_date: new Date(2022, 0, 1)},
  ]);
};
