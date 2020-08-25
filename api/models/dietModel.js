const db = require('../../database/connection');

module.exports = {
  add,
  findById,
  getAllPublic,
  getAll,
  update,
  remove,
};

async function add(diet) {
  const [entity] = await db('entity').insert({user_id: diet.user_id, type: 3}, 'id')
  return db('diets').insert({...diet, entity_id: entity}).returning('*');
}

function findById(id) {
  return db('diets').where({ id }).first();
}

function getAllPublic() {
  return db('diets')
      .where('diets.shareable', true)
}

function getAll(id) {
  return db('diets')
    .join('users', 'users.id', 'diets.user_id')
    .select( 
      'diets.id',
      'diets.user_id',
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
      'diets.food_fiber'
      )
    .from('diets')
    .where('diets.user_id', id)
}

function update(changes, id) {
  return db('diets').where({ id }).update(changes).returning('*');
}

function remove(id) {
  return db('diets').where({id}).del();
}
