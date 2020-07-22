exports.seed = function(knex, Promise) {
    return knex('entity').insert([
      {user_id: 2, type: 1}, //1
      {user_id: 2, type: 1}, //2
      {user_id: 1, type: 1}, //3
      {user_id: 3, type: 1}, //4
      {user_id: 1, type: 1}, //5

      {user_id: 1, type: 3}, //6
      {user_id: 1, type: 3}, //7
      {user_id: 1, type: 3}, //8
      {user_id: 1, type: 3}, //9
      {user_id: 1, type: 3}, //10
      {user_id: 1, type: 3}, //11
      {user_id: 1, type: 3}, //12
      {user_id: 1, type: 3}, //13

      {user_id: 2, type: 2}, //14
      {user_id: 2, type: 2}, //15  //1 workout, 2 routine, 3 diet, 4 mealplan, 5 comment

      {user_id: 4, type: 1}, //16
      {user_id: 5, type: 1}, //17
      {user_id: 6, type: 1}, //18
      
      {user_id: 1, type: 5}, //19
      {user_id: 2, type: 5}, //20
      {user_id: 3, type: 5}, //21
      {user_id: 4, type: 5}, //22
      {user_id: 5, type: 5}, //23
      {user_id: 6, type: 5}, //24
      {user_id: 7, type: 5}, //25
      {user_id: 8, type: 5}, //26

      {user_id: 1, type: 4}, //27
      {user_id: 1, type: 4}, //28
      {user_id: 1, type: 4}, //29
    ]);
 };