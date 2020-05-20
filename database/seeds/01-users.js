const bcrypt = require('bcrypt');

function encrypt(string){
  return bcrypt.hashSync(string, 8);
}

exports.seed = function(knex, Promise) {
      return knex('users').insert([
        {username: 'test', email: 'test@gmail.com', password: encrypt('password'), affiliate: false, verified: false, xp: 0},
        {username: 'nate', email: 'nate1898@gmail.com', password: encrypt('password'), affiliate: false, verified: false, xp: 0},
        {username: 'cory', email: 'cory@gmail.com', password: encrypt('password'), affiliate: false, verified: false, xp: 0}
      ]);
   };


