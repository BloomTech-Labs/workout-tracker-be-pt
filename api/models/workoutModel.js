const db = require('../../database/connection');

function getPublicWorkouts() {
    return db('workouts')
        .where('workouts.workout_share', true)
}

function getWorkoutsByUser(id) {
    return db('users')
        .join('workouts', 'users.id', '=', 'workouts.user_id')
        .where('users.id', '=', id)
        .select(
            'workouts.id',
            'workouts.workout_category',
            'workouts.workout_title',
            'workouts.workout_date',
            'workouts.workout_length',
            'workouts.workout_description',
            'workouts.completed',
            'workouts.entity_id'
        )
}

function getWorkoutById(id, user_id){
    return db('workouts').where('workouts.id', '=', id)
        .where('workouts.user_id', '=', user_id)
}

async function addWorkout(workout) {
    const [entity] = await db('entity').insert({user_id: workout.user_id, type: 1}, 'id')
    const [id] = await db('workouts').insert({...workout, entity_id: entity}, 'id')

    return db('workouts').where('workouts.id', '=', id);
}

async function editWorkout(workout, id) {
    const res = await db('workouts').where('workouts.id', '=', id)
        .where('workouts.user_id', '=', workout.user_id)
        .update(workout)

    return db('workouts').where('workouts.id', '=', id)
}

function deleteWorkout(userId, id) {
    return db('workouts').where('workouts.id', '=', id)
        .where('workouts.user_id', '=', userId)
        .del()
}

module.exports = {
    getPublicWorkouts,
    getWorkoutsByUser,
    getWorkoutById,
    addWorkout,
    editWorkout,
    deleteWorkout
}