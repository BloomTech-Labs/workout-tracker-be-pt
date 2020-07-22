const db = require('../../database/connection');

module.exports = {
    getMealplans,
    getMealplan,
    addMealplan,
    addFoodToMealplan,
    updateMealplan,
    removeMealplan,
    removeFoodInMealplan
};

async function getMealplans(user_id){
    const mealplans = await db('mealplans')
        .where('mealplans_id', user_id)
    
    await Promise.all(mealplans.map(async(item, index) => {
        mealplans[index].meal = await db('mealplans')
            .where('mealplans.user_id', item.user_id)
            .where('mealplans.id', item.id)
            .innerJoin('dietmealbridge', 'dietmealbridge.mealplans_id', 'mealplans.id')
            .innerJoin('diets', 'diets.id', 'dietmealbridge.diets_id')
            .select(
                'diets.id',
                'diets.meal_date',
                'diets.meal_time',
                'diets.meal_category',
                'diets.food_name',
                'diets.food_quantity',
                'diets.food_measure',
                'diets.food_calories',
                'diets.food_fat',
                'diets.foot_protein',
                'diets.food_carbs',
                'diets.food_fiber',
                'diets.meal_notes'
            )
    }))
    return {...mealplans}
}

async function getMealplan(id, user_id) {
    const meals = await db('mealplans')
        .where('mealplans.user_id', user_id)
        .where('mealplans.id', id)
        .innerJoin('dietmealbridge', 'dietmealbridge.mealplans_id', 'mealplans.id')
        .innerJoin('diets', 'diets.id', 'dietmealbridge.diets_id')
        .select(
            'diets.id',
            'diets.meal_date',
            'diets.meal_time',
            'diets.meal_category',
            'diets.food_name',
            'diets.food_quantity',
            'diets.food_measure',
            'diets.food_calories',
            'diets.food_fat',
            'diets.food_protein',
            'diets.food_carbs',
            'diets.food_fiber',
            'diets.meal_notes'
        )
    const mealplan = {}

    const mealplan_title = await db('mealplans')
            .where('mealplans.user_id', user_id)
            .where('mealplans.id', id)
            .select('mealplans.mealplan_title')

        mealplan.title = mealplan_title[0].mealplan_title
        mealplan.meals = meals

        return mealplan
}

async function addMealplan(mealplan) {
    const [entity] = await db('entity')
        .insert({ user_id: mealplan.user_id, type: 4 }, 'id')
    const [id] = await db('mealplans')
        .insert({ ...mealplan, entity_id: entity }, 'id')

    return db('mealplans')
        .where('mealplans.id', id)
}

async function addFoodToMealplan(dietmealbridge, user_id) {
    await db('dietmealbridge')
        .insert(dietmealbridge)

    return getMealplan(dietmealbridge.mealplans_id, user_id)
}

async function updateMealplan(id, mealplan) {
    await db('mealplans')
        .where('mealplans.user_id', mealplan.user_id)
        .where('mealplans.id', id)
        .update(mealplan)
}

function removeMealplan(id, user_id) {
    return db('mealplans')
        .where('mealplans.id', id)
        .where('mealplans.user_id', user_id)
        .del()

}

async function removeFoodInMealplan(id, user_id, diets_id) {
    const isvalid = await db('mealplans')
        .where('mealplans.user_id', user_id)
        .where('mealplans.id', id)

        if(isvalid[0]) {
            return db('dietmealbridge')
                .where('dietmealbridge.mealplans_id', id)
                .where('dietmealbridge.diets_id', diets_id)
                .del()
        } else {
            return "Not a valid user"
        }
}

