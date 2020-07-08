exports.seed = function(knex, Promise) {
    return knex('entity').insert([
      {user_id: 2},
      {user_id: 2},
      {user_id: 1},
      {user_id: 3},
      {user_id: 1},
      {user_id: 1},
      {user_id: 1},
      {user_id: 1},
      {user_id: 1},
      {user_id: 1},
      {user_id: 1},
      {user_id: 1},
      {user_id: 1},
      {user_id: 2},
      {user_id: 2},
    ]);
 };