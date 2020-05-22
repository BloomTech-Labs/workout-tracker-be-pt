const db = require('../../database/connection');


function getUsers(){
   return db('users');
}

function getUserById(id){
    return db('users')
        .where({id: id})
}

function updateUser(id, changes){
        db('users')
        .where({ id })
        .update(changes)
}

function deleteUser(id){
    return db('users')
        .where({id})
        .del()
}

function findBy(filter){
    return db('users')
        .where(filter);
}


module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    findBy
}