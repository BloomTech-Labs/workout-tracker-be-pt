const db = require("../../connection");

// async function add(user) {
//   const [id] = await db("users").insert(user, "id");

//   return db(users).where({ id }).first();
// }

function getUsers() {
  return db("users");
}

function getUserById(id) {
  return db("users").where({ id });
}

function updateUser(id, changes) {
  db("users").where({ id }).update(changes);
}

function deleteUser(id) {
  return db("users").where({ id }).del();
}

function findBy(filter) {
  return db("users").where(filter);
}

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  findBy,
  //   add,
};
