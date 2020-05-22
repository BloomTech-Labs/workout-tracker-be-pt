exports.seed = function(knex, Promise) {
    return knex('total_workouts').insert([
      { user_id: 1, workout_id: 1},
      { user_id: 2, workout_id: 2},
    ]);
};