exports.seed = function(knex, Promise) {
    return knex('workouts').insert([
      { workout_title: "Nathans ab workout", workout_date: "2020-05-22", workout_start_time: "04:05 AM", workout_end_time: "04:35 AM", completed: false},
      { workout_title: "Cory's bicep workout", workout_date: "2020-05-22", workout_start_time: "06:05 AM", workout_end_time: "06:35 AM", completed: false},
      { workout_title: "New workout2", workout_date: "2020-05-22", workout_start_time: "06:05 AM", workout_end_time: "06:35 PM", completed: false}
    ]);
 };