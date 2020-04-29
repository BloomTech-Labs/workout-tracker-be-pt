exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.text("username").unique().notNullable();
      tbl.text("email").unique().notNullable();
      tbl.text("password").notNullable();
      tbl.text("goal");
      tbl.date("goal_startdate");
      tbl.date("goal_enddate");
    })

    .createTable("daily_workout_totals", (tbl) => {
      tbl.increments();
      tbl.date("workout_date");
      tbl.time("workout_starttime");
      tbl.time("workout_endtime");
      tbl.integer("user_id").unsigned().notNullable().references("users.id");
    })
    .createTable("workouts", (tbl) => {
      tbl.increments();
      tbl.text("workout_name");
      tbl.text("workout_description");
      tbl.text("muscles");
      tbl.text("equipment");
    })
    .createTable("workout_log", (tbl) => {
      tbl.increments();
      tbl.date("date_set");
      tbl.time("time_set");
      tbl.text("muscles");
      tbl.boolean("equipment");
      tbl.integer("user_id").unsigned().notNullable().references("users.id");
      tbl
        .integer("workouts_id")
        .unsigned()
        .notNullable()
        .references("workouts.id");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("workout_log")
    .dropTableIfExists("workouts")
    .dropTableIfExists("daily_workout_totals")
    .dropTableIfExists("users");
};
