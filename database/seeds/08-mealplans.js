exports.seed = function (knex) {
    return knex('mealplans')
      .del()
      .then(() => {
        return knex('mealplans').insert([
            { 
                mealplan_title: "Monday Lunch",
                user_id: 1, 
                entity_id: 27
            },
            { 
                mealplan_title: "Monday Breakfast",
                user_id: 1,
                entity_id: 28
            },
            {
                mealplan_title: "Monday Dinner",
                user_id: 1,
                entity_id: 29
            }
        ]);
    });
};