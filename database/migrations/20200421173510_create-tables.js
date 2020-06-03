exports.up = function (knex) {
    return (
        knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username')
                .notNullable()
                .unique();
            tbl.string('email')
                .notNullable()
                .unique();
            tbl.string('password')
                .notNullable();
            tbl.string('bio');
            tbl.integer('zip', 5)
                .unsigned();
            tbl.boolean('affiliate')
                .defaultTo(false)
            tbl.boolean('verified')
                .defaultTo(false)
            tbl.integer('xp')
                .defaultTo(0)
                .unsigned()
        })
        .createTable('workouts', tbl => {
            tbl.increments();
            tbl.string('workout_category')
                .notNullable();
            tbl.string('workout_title')
                .notNullable();
            tbl.date('workout_date')
                .notNullable();
            tbl.time('workout_start_time')
                .notNullable();
            tbl.time('workout_end_time')
                .notNullable();
            tbl.string('workout_description');
            tbl.boolean('completed')
                .defaultTo(false)
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('diets', tbl => {
            tbl.increments();
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.text('diet_description')
                .notNullable();
        })
        .createTable('following', tbl => {
            tbl.increments();
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('follower_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('badges', tbl => {
            tbl.increments();
            tbl.text('badge_desc')
                .notNullable()
                .unique()
            tbl.integer('xp_value')
                .unsigned()
                .notNullable();
        })
        .createTable('achieved', tbl => {
            tbl.increments();
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('badge_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('badges')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.boolean('completed')
                .notNullable()
                .defaultTo(false);

        })
        .createTable('entity', tbl => {
            tbl.increments();
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('ratings', tbl => {
            tbl.integer('entity_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('entity')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('rating', 5)
        })
        .createTable('liked', tbl => {
            tbl.integer('entity_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('entity')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('rating', 5)
        })
        .createTable('comments', tbl => {
            tbl.integer('entity_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('entity')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.text('comment_data')
                .notNullable();
        })
    )
};

exports.down = function (knex) {
    return (
        knex.schema
        .dropTableIfExists('comments')
        .dropTableIfExists('liked')
        .dropTableIfExists('ratings')
        .dropTableIfExists('entity')
        .dropTableIfExists('achieved')
        .dropTableIfExists('badges')
        .dropTableIfExists('following')
        .dropTableIfExists('diets')
        .dropTableIfExists('workouts')
        .dropTableIfExists('users')

    )
};