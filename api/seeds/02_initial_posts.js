/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {user_id: 1, title: "baby's first post", content: "hello bloggy world@!@@"},
    {user_id: 2, title: "another post", content: "more content for the masses"},
    {user_id: 1, title: "i love posting!", content: "inundation"},
  ]);
};
