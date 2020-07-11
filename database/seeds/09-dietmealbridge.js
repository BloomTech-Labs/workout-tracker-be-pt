exports.seed = function (knex) {
    return knex('dietmealbridge')
      .del()
      .then(() => {
        return knex('dietmealbridge').insert([
            { 
                mealplans_id: 1,
                diets_id: 1 
            },
            { 
                mealplans_id: 1,
                diets_id: 2
            },
            {
                mealplans_id: 1,
                diets_id: 3
            }
        ]);
    });
};