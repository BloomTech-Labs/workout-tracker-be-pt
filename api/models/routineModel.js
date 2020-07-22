const db = require('../../database/connection');

async function getRoutines(user_id){
    const routines = await db('routines')
        .where('routines.user_id', '=', user_id)
    // returns a promise that way routines[index].workouts isnt undefined in the return statement later then
    // and maps through the routines array to get every workout associated with said routines and
    // then sets routines index to the array of workouts 
    await Promise.all(routines.map(async (element, index) => { 
            routines[index].workout = await db('routines')
                .where('routines.user_id', '=', element.user_id)
                .where('routines.id', '=', element.id)
                .innerJoin('connector', 'connector.routines_id', '=', 'routines.id' )
                .innerJoin('workouts', 'workouts.id', '=', 'connector.workout_id')
                .select(
                    'workouts.id',
                    'workouts.workout_category',
                    'workouts.workout_title',
                    'workouts.workout_date',
                    'workouts.workout_length',
                    'workouts.workout_description',
                    'workouts.completed'
                )
        }));
    
    return {...routines}
}

async function getRoutine(id, user_id){
    const workouts = await db('routines')
        .where('routines.user_id', '=', user_id)
        .where('routines.id', '=', id)
        .innerJoin('connector', 'connector.routines_id', '=', 'routines.id' )
        .innerJoin('workouts', 'workouts.id', '=', 'connector.workout_id')
        .select(
            'workouts.id',
            'workouts.workout_category',
            'workouts.workout_title',
            'workouts.workout_date',
            'workouts.workout_length',
            'workouts.workout_description',
            'workouts.completed'
        )

    const routine = {};
    
    const routine_title = await db('routines')
        .where('routines.user_id', '=', user_id)
        .where('routines.id', '=', id)
        .select('routines.routine_title')

    routine.title = routine_title[0].routine_title
    
    routine.workouts = workouts;

    return routine;
}

async function addRoutine(routine){
    const [entity] = await db('entity').insert({user_id: routine.user_id, type: 2}, 'id');
    const [id] = await db('routines').insert({...routine, entity_id: entity}, 'id')

    return db('routines').where('routines.id', '=', id);
}

async function addWorkoutToRoutine(connection, user_id){
    await db('connector').insert(connection)
    
    return getRoutine(connection.routines_id, user_id);
}

async function editRoutine(id, routine){
    await db('routines').where('routines.user_id', '=', routine.user_id).where('routines.id', '=', id).update(routine)

    return db('routines').where('routines.id', '=', id);
}

function deleteRoutine(id, user_id){
    return db('routines').where('routines.id', '=', id).where('routines.user_id', '=', user_id).del();
}

async function deleteWorkoutInRoutine(id, user_id, workout_id){
    const isvalid = await db('routines').where('routines.user_id', '=', user_id).where('routines.id', '=', id)
    
    if(isvalid[0]){
        return db('connector').where('connector.routines_id', '=', id).where('connector.workout_id', '=', workout_id).del()
    } else {
        return "not valid user id for specific workout"
    }
}

module.exports = {
    getRoutines,
    getRoutine,
    addRoutine,
    addWorkoutToRoutine,
    editRoutine,
    deleteRoutine,
    deleteWorkoutInRoutine
}