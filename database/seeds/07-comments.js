exports.seed = function(knex, Promise) {
    return knex('comments').insert([
      {entity_id: 1, user_id: 1, this_entity_id: 19, comment_data: "Hello Twitter World!"},
      {entity_id: 19, user_id: 2, this_entity_id: 20, comment_data: "2"},
      {entity_id: 19, user_id: 3, this_entity_id: 21, comment_data: "3"},
      {entity_id: 19, user_id: 4, this_entity_id: 22, comment_data: "4"},
      {entity_id: 22, user_id: 5, this_entity_id: 23, comment_data: "5"},
      {entity_id: 22, user_id: 6, this_entity_id: 24, comment_data: "6"},
      {entity_id: 24, user_id: 7, this_entity_id: 25, comment_data: "7"},
      {entity_id: 21, user_id: 8, this_entity_id: 26, comment_data: "8"},
    ]);
};