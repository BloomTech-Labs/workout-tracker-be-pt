const bcrypt = require('bcrypt');

function encrypt(string){
  return bcrypt.hashSync(string, 8);
}

exports.seed = function(knex, Promise) {
      return knex('users').insert([
        { username: 'test', email: 'test@gmail.com', password: encrypt('password'), affiliate: false, verified: false, xp: 0 },       //1
        { username: 'nate', email: 'nate1898@gmail.com', password: encrypt('password'), affiliate: false, verified: false,xp: 0 },    //2
        { username: 'cory', email: 'cory@gmail.com', password: encrypt('password'), affiliate: false, verified: false, xp: 0 },       //3
        { username: 'giovani', email: 'giovani@gmail.com', password: encrypt('password'), affiliate: false, verified: false, xp: 0 }, //4
        { username: 'leza', email: 'leza@gmail.com', password: encrypt('password'), affiliate: false, verified: false, xp: 0 },       //5
        { username: 'jessica', email: 'jessica@gmail.com', password: encrypt('password'), affiliate: false, verified: false, xp: 0 }, //6
        { username: 'anthony', email: 'anthony@gmail.com', password: encrypt('password'), affiliate: false, verified: false, xp: 0 }, //7
        { username: 'steven', email: 'steven@gmail.com', password: encrypt('password'), affiliate: false, verified: false, xp: 0 }    //8
      ]);
   };


