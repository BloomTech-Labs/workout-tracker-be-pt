exports.seed = function (knex, Promise) {
  // Inserts seed entries
  return knex("users").insert([
    {
      username: "jennl75",
      email: "jennhott97@gmail.com",
      password: "test123",
      goal: "Lose weight",
      goal_startdate: "2020-05-01",
      goal_enddate: "2020-09-01",
    },
    {
      username: "Dessi95",
      email: "dessi95@gmail.com",
      password: "test456",
      goal: "Gain muscle",
      goal_startdate: "2020-05-01",
      goal_enddate: "2020-09-01",
    },
    {
      username: "TayTay02",
      email: "taytay02@gmail.com",
      password: "test789",
      goal: "Stay active",
      goal_startdate: "2020-05-01",
      goal_enddate: "2020-09-01",
    },
  ]);
};
