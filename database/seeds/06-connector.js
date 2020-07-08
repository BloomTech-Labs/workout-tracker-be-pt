exports.seed = function(knex, Promise) {
    return knex('connector').insert([
      {routines_id: 2, workout_id: 2},
      {routines_id: 2, workout_id: 3},
      {routines_id: 1, workout_id: 1}
    ]);
};