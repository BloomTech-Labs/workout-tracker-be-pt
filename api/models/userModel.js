const db = require('../../database/connection');


function getUsers() {
    return db('users');
}

async function add(user) {
    const [id] = await db("users").insert(user, "id")

    return findById(id);
}

function findById(id) {
    return db('users')
        .where({
            id
        })
        .first()
}

function updateUser(id, changes) {
    return db('users')
        .where('users.id', '=', id)
        .update(changes)
}

function deleteUser(id) {
    return db('users')
        .where({
            id
        })
        .first()
        .del()
}

function findBy(filter) {
    return db('users')
        .where(filter);
}


module.exports = {
    getUsers,
    add,
    findById,
    updateUser,
    deleteUser,
    findBy
}