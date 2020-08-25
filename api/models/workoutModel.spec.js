const { request } = require('express');

const {getPublicWorkouts, getWorkoutsByUser} = require('./workoutModel');

describe('Workout Function test', () => {
    it('should get public data', () => {
        const data = getPublicWorkouts();
        expect(data).not.toBe(null); //
    });

    it('should get workouts by user id', () =>{
        const data = getWorkoutsByUser(1);
        expect(data).not.toBe(null);
    })
});