exports.seed = function(knex, Promise) {
      return knex('routines').insert([
        {routine_title: "Nathan's Routine", user_id: 2},
        {routine_title: "Nathans Leg Routine", user_id: 2}
      ]);
   };


