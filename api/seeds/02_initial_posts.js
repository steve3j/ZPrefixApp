/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {user_id: 1, title: "baby's first post", content: "hello bloggy world@!@@", creation_date: new Date(2022, 0, 1)},
    {user_id: 2, title: "another post", content: "more content for the masses", creation_date: new Date(2022, 0, 1)},
    {user_id: 2, title: "i love posting!", content: "inundation", creation_date: new Date(2022, 0, 1)},
    {user_id: 2, title: "Panic Attacks", content: "Panic attacks are one of the most common and debilitating forms of anxiety. They are not dangerous in themselves but can lead to other health problems if left untreated. In this article we will discuss what causes them, their symptoms and how to get rid of them for good! Many people have just one or two panic attacks in their lifetimes, and the problem goes away, perhaps when a stressful situation ends. But if you’ve had recurrent, unexpected panic attacks and spent long periods in constant fear of another attack, you may have a condition called panic disorder. Although panic attacks themselves are not life-threatening, they can be frightening and significantly affect your quality of life. Treatment can be very effective especially if applied early on.", creation_date: new Date(2022, 0, 1).toISOString().split("T")[0]},
  ]);
};
