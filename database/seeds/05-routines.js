exports.seed = function(knex, Promise) {
      return knex('routines').insert([
        {routine_title: "Nathan's Routine", user_id: 2, entity_id: 14},
        {routine_title: "Nathans Leg Routine", user_id: 2, entity_id: 15}
      ]);
   };


