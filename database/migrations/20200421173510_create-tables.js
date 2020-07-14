exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments();
      tbl.string('username').notNullable().unique();
      tbl.string('email').notNullable().unique();
      tbl.string('password').notNullable();
      tbl.string('bio');
      tbl.integer('zip', 5).unsigned();
      tbl.boolean('affiliate').defaultTo(false);
      tbl.boolean('verified').defaultTo(false);
      tbl.integer('xp').defaultTo(0).unsigned();
      tbl.integer('height').defaultTo(0).unsigned();
      tbl.decimal('weight', 3, 2).defaultTo(0).unsigned();
      tbl.binary('image');
    })
    .createTable('entity', (tbl) => {
      tbl.increments();
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('workouts', (tbl) => {
      tbl.increments();
      tbl.string('workout_category').notNullable();
      tbl.string('workout_title').notNullable();
      tbl.date('workout_date').notNullable();
      tbl.string('workout_length').notNullable();
      tbl.string('workout_description');
      tbl.boolean('workout_share').defaultTo(true);
      tbl.boolean('completed').defaultTo(false);
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.bigInteger('entity_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('entity')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('routines', (tbl) => {
      tbl.increments();
      tbl.string('routine_title').notNullable();
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.bigInteger('entity_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('entity')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.boolean('shareable')
        .defaultTo(true);
    })
    .createTable('connector', (tbl) => {
      tbl.integer('routines_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('routines')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('workout_id')
        .unsigned()
        .notNullable()
        .unique()
        .references('id')
        .inTable('workouts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('diets', (tbl) => {
      tbl.increments();
      tbl.string('meal_date').notNullable();
      tbl.string('meal_time').notNullable();
      tbl.string('meal_category').notNullable();
      tbl.string('food_name').notNullable();
      tbl.decimal('food_quantity', null).notNullable();
      tbl.string('food_measure');
      tbl.decimal('food_calories', null).notNullable();
      tbl.decimal('food_fat', null).notNullable();
      tbl.decimal('food_protein', null).notNullable();
      tbl.decimal('food_carbs', null).notNullable();
      tbl.decimal('food_fiber', null).notNullable();
      tbl.text('meal_notes');
      tbl.boolean('shareable').defaultTo(true);
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.bigInteger('entity_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('entity')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('mealplans', (tbl) => {
      tbl.increments();
      tbl.string('mealplan_title').notNullable();
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.bigInteger('entity_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('entity')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.boolean('shareable').defaultTo(true);
    })
    .createTable('dietmealbridge', (tbl) => {
      tbl.integer('mealplans_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mealplans')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('diets_id')
        .unsigned()
        .notNullable()
        .unique()
        .references('id')
        .inTable('diets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('following', (tbl) => {
      tbl.increments();
      tbl.unique(['user_id', 'follower_id'])
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('follower_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('badges', (tbl) => {
      tbl.increments();
      tbl.text('badge_desc').notNullable().unique();
      tbl.integer('xp_value').unsigned().notNullable();
    })
    .createTable('achieved', (tbl) => {
      tbl.increments();
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('badge_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('badges')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.boolean('completed').notNullable().defaultTo(false);
    })
    .createTable('ratings', (tbl) => {
      tbl.unique(['entity_id', 'user_id']);
      tbl
        .integer('entity_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('entity')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('rating', 5);
    })
    .createTable('liked', (tbl) => {
      tbl.unique(['entity_id', 'user_id']);
      tbl
        .integer('entity_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('entity')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('comments', (tbl) => {
      tbl
        .integer('entity_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('entity')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('this_entity_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('entity')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.text('comment_data').notNullable();
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('liked')
    .dropTableIfExists('ratings')
    .dropTableIfExists('achieved')
    .dropTableIfExists('badges')
    .dropTableIfExists('following')
    .dropTableIfExists('dietmealbridge')
    .dropTableIfExists('mealplans')
    .dropTableIfExists('diets')
    .dropTableIfExists('connector')
    .dropTableIfExists('routines')
    .dropTableIfExists('workouts')
    .dropTableIfExists('entity')
    .dropTableIfExists('users');
};