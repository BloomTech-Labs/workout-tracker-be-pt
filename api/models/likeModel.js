const db = require('../../database/connection');

function addLike(entity_id, user_id){
    return db('liked').insert({user_id: user_id, entity_id: entity_id}).returning('*');
}

function getLikes(entity_id){
    return db('liked').where('entity_id', '=', entity_id);
}

function getNumberOfLikes(entity_id){
    return db('liked').where('entity_id', '=', entity_id).count();
}

function removeLikes(entity_id, user_id){
    return db('liked')
        .where('entity_id', '=', entity_id)
        .where('user_id', '=', user_id)
        .del()
}

function getLikedByUser(user_id){
    return db('liked').where({user_id: user_id}).orderBy('liked.created_at', 'desc');
}

module.exports = {
    addLike,
    getLikes,
    getNumberOfLikes,
    removeLikes,
    getLikedByUser
}