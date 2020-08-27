exports.seed = function (knex, Promise) {
  return knex('workouts').insert([{
      workout_category: "Abs",
      workout_title: "Nathans ab workout",
      workout_date: "2020-05-22",
      workout_length: "30m",
      workout_time: '14:30:00',
      workout_description: "A workout designed to get that 6-pack you've always dreamed of.",
      workout_share: true,
      completed: false,
      user_id: 2,
      entity_id: 1
    },
    {
      workout_category: "Legs",
      workout_title: "Nathans Leg workout",
      workout_date: "2020-05-22",
      workout_length: "30m",
      workout_time: '14:30:00',
      workout_description: "Define the lower legs with this intense leg workout.",
      workout_share: true,
      completed: false,
      user_id: 2,
      entity_id: 2
    },
    {
      workout_category: "leg",
      workout_title: "Nathans leg 2 workout",
      workout_date: "2020-08-22",
      workout_length: "30m",
      workout_time: '14:30:00',
      workout_description: "Get the most powerful thighs in the least amount of time.",
      workout_share: true,
      completed: false,
      user_id: 1,
      entity_id: 3
    },
    {
      workout_category: "Biceps",
      workout_title: "Cory's bicep workout",
      workout_date: "2020-05-22",
      workout_length: "30m",
      workout_time: '14:30:00',
      workout_description: "Make that tank top look GOOD!",
      workout_share: true,
      completed: false,
      user_id: 3,
      entity_id: 4
    },
    {
      workout_category: "N/A",
      workout_title: "New workout2",
      workout_date: "2020-05-22",
      workout_length: "30m",
      workout_time: '14:30:00',
      workout_description: "Make cardio fitness your new goal",
      workout_share: true,
      completed: false,
      user_id: 1,
      entity_id: 5
    },
    {
      workout_category: "Abs",
      workout_title: "Giovani's workout",
      workout_date: "2020-07-16",
      workout_length: "1H",
      workout_time: '14:30:00',
      workout_description: "I'll make you look fantastic in just 1 hour",
      workout_share: true,
      completed: false,
      user_id: 4,
      entity_id: 16
    },
    {
      workout_category: "Biceps",
      workout_title: "Leza's workout",
      workout_date: "2020-07-16",
      workout_length: "1H",
      workout_time: '14:30:00',
      workout_description: "The workout designed for the busy Mom who still wants that fitness",
      workout_share: true,
      completed: false,
      user_id: 5,
      entity_id: 17
    },
    {
      workout_category: "Biceps",
      workout_title: "Jessicas's workout",
      workout_date: "2020-07-16",
      workout_length: "1H",
      workout_time: '14:30:00',
      workout_description: "The ultimate power lifting workout.",
      workout_share: true,
      completed: false,
      user_id: 6,
      entity_id: 18
    }
  ]);
};