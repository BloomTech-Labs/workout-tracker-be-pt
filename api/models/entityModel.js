const db = require('../../database/connection');
//1 workout, 2 routine, 3 diet, 4 mealplan, 5 comment
const types = {
    WORKOUT: 1,
    ROUTINE: 2,
    DIET: 3,
    MEALPLAN: 4,
    COMMENT: 5
}

async function getPublic(){
    const list = [];
    await Promise.all((await db('entity').orderBy('entity.created_at', 'desc')).map(async entity =>{
        let [user] = await db('users').where('id', '=', entity.user_id).select('users.id', 'users.username', 'users.image')
        switch(entity.type){
            case types.WORKOUT: 
                    let [workout] = await db('workouts').where('workouts.entity_id', '=', entity.id).where('workouts.workout_share', '=', true);
                    workout = {...workout, type: types.WORKOUT, user: user}
                    list.push(workout);
                break;
            case types.ROUTINE: 
                    let [routine] = await db('routines').where('routines.entity_id', '=', entity.id).where('routines.shareable', '=', true);
                    routine = {...routine, type: types.ROUTINE, user: user}
                    list.push(routine);
                break;
            case types.DIET: 
                    let [diet] = await db('diets').where('diets.entity_id', '=', entity.id).where('diets.shareable', '=', true);
                    diet = {...diet, type: types.DIET, user: user} 
                    list.push(diet);
                break;
            case types.MEALPLAN: 
                    let [mealplan] = await db('mealplans').where('mealplans.entity_id', '=', entity.id).where('mealplans.shareable', '=', true);
                    mealplan = {...mealplan, type: types.MEALPLAN, user: user}
                    list.push(mealplan);
                break;
            case types.COMMENT:

                break;
            default:
                    throw new Error('Problem with entity db')
                break;
        }
    }))

    return list;
}


module.exports = {
  getPublic
};
