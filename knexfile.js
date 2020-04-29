// Update with your config settings.
require("dotenv").config();
const dbConnection = process.env.DATABASE_URL || "localhost";

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "paulabernathy",
      password: "thetempo1",
      database: "workout_tracker",
      charset: "utf8",
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    useNullAsDefault: true,
  },
};
